// @ts-check

// node

import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import "dotenv/config";
import cors from "cors";

// shopify

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

// routes

import { authenticate_wallet } from "./routes/wallet/auth.js";
import { createWallet } from "./routes/wallet/create-wallet.js";

import { getShopData } from "./utils/getShopDetails.js";
import { getWallet } from "./routes/wallet/get-wallet.js";
import { saveDetails } from "./routes/checkout/save-details.js";
import { getDetails } from "./routes/checkout/get-details.js";
import { createWalletExt } from "./routes/extension/create-wallet.js";

import { initiateTransfer } from "./routes/transfer/initiate-token-transfer.js";
import { getTokens } from "./routes/transfer/get-tokens.js";
import { checkExtensionRequest } from "./utils/checkExtensionReq.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10,
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

const jsonErrorHandler = (err, req, res, next) => {
  console.log("json error", err);
  res.status(500).send({ error: err });
};

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers }),
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

// * cors extension
// ! allows cross-origin-resource-sharing. only modify for security reasons

app.use(cors());

// ! do not remove
app.use(express.json());
app.use(jsonErrorHandler);

// ! shopify extension requests

app.post("/api/create-client-wallet", (req, res) => {
  const check = checkExtensionRequest(req);

  if (check) {
    return createWalletExt(req, res);
  } else {
    res.status(401).json({ error: "Unauthorised", code: 401 });
  }
});

app.post("/api/initiate-token-transfer", (req, res) => {
  const check = checkExtensionRequest(req);

  if (check) {
    return initiateTransfer(req, res);
  } else {
    res.status(401).json({ error: "Unauthorised", code: 401 });
  }
});

app.post("/api/get-tokens", (req, res) => {
  const check = checkExtensionRequest(req);

  if (check) {
    return getTokens(req, res);
  } else {
    res.status(401).json({ error: "Unauthorised", code: 401 });
  }
});

app.use("/api/*", shopify.validateAuthenticatedSession());

// ! do not remove

// shopify's content-security-policy

app.use(shopify.cspHeaders());

// wallet

app.get("/api/auth-wallet", authenticate_wallet);
app.get("/api/get-wallet", getWallet);
app.post("/api/create-wallet", createWallet);

// checkout detais

app.get("/api/get-checkout-details", getDetails);
app.post("/api/save-checkout-details", saveDetails);

// get shop data

app.get("/api/get-shop-data", async (_req, res, _next) => {
  const session = res.locals.shopify.session;
  const shopName = await getShopData(session);

  return res.status(200).send({
    data: shopName,
  });
});

// not found route

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

// test route

app.use(serveStatic(STATIC_PATH, { index: false }));

app.listen(PORT);
