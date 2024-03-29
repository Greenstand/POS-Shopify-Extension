// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { authenticate_wallet } from "./routes/wallet/auth.js";
import { createWallet } from "./routes/wallet/create-wallet.js";

import "dotenv/config";
import cors from "cors";
import { getShopData } from "./utils/getShopDetails.js";
import { getWallet } from "./routes/wallet/get-wallet.js";
import { saveDetails } from "./routes/checkout/save-details.js";
import { getDetails } from "./routes/checkout/get-details.js";
import { createClientWallet } from "./routes/wallet/create-client-wallet.js";
import { createWalletExt } from "./routes/extension/create-wallet.js";

import jwt from "jsonwebtoken";
import crypto from "crypto";

import { initiateTransfer } from "./routes/transfer/initiate-token-transfer.js";
import { acceptTransfer } from "./routes/transfer/accept-token-transfer.js";

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
// ! allows cross-origin-resource-sharing. Only modify for security reasons - important for app to function

app.use(cors());

// ! do not remove
app.use(express.json());
app.use(jsonErrorHandler);

app.post("/api/create-client-wallet", (req, res) => {
  const auth = req.headers.authorization;
  const ext_token = auth?.split(" ")[1];

  const payload = jwt.verify(ext_token || "", process.env.CLIENT_SECRET || "", {
    complete: true,
  });

  const encoded_payload = crypto
    .createHmac("sha256", process.env.CLIENT_SECRET || "")
    .update(ext_token?.split(".")[0] + "." + ext_token?.split(".")[1], "utf8")
    .digest("base64url");

  if (encoded_payload == payload.signature) {
    if (!req.body.walletName) {
      return res.status(400).json({ error: "Invalid body" });
    }

    createWalletExt(req.body.walletName).then((code) => {
      if (code == "200") {
        res.status(200).json({ message: "Successfully created wallet" });
      } else if (code == "409") {
        res.status(409).json({ error: "Wallet already exists", code: 409 });
      } else {
        res.status(500).json({ error: "Internal server error", code: 500 });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorised", code: 401 });
  }
});

app.post("/api/initiate-token-transfer", (req, res) => {
  const auth = req.headers.authorization;
  const ext_token = auth?.split(" ")[1];

  const payload = jwt.verify(ext_token || "", process.env.CLIENT_SECRET || "", {
    complete: true,
  });

  const encoded_payload = crypto
    .createHmac("sha256", process.env.CLIENT_SECRET || "")
    .update(ext_token?.split(".")[0] + "." + ext_token?.split(".")[1], "utf8")
    .digest("base64url");

  if (encoded_payload == payload.signature) {
    return initiateTransfer(req, res);
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

// // transfer token (might need to accept token)
// app.post("/api/initiate-transfer", initiateTransfer);
// app.post("/api/accept-transfer", acceptTransfer);

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
