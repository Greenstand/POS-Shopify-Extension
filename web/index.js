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
import {
  createMetafield,
  getMetafield,
  deleteMetafield,
} from "./utils/metafield.js";
import { getWallet } from "./routes/wallet/get-wallet.js";

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

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(cors());
app.use(express.json());
app.use(jsonErrorHandler);

app.use(shopify.cspHeaders());

app.get("/api/auth-wallet", authenticate_wallet);
app.get("/api/get-wallet", getWallet);

app.post("/api/create-wallet", createWallet);

app.get("/api/get-shop-data", async (_req, res, _next) => {
  const session = res.locals.shopify.session;
  const shopName = await getShopData(session);

  return res.status(200).send({
    data: shopName,
  });
});

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.listen(PORT);
