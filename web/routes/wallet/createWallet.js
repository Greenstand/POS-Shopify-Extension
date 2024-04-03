import apiClient from "../../utils/apiClient.js";
import { updateMetafield } from "../../utils/metafield.js";

// ! func: createWallet (3 params)
// ? req, res
// * CRUD type: post
// * return value: null

export const createWallet = async (req, res) => {
  const session = res.locals.shopify.session;
  const auth = apiClient.isAuthenticated();
  const { walletName, shopName, shopOwnerName, shopEmail } = req.body;
  console.log(req.body);

  if (!auth) {
    try {
      const data = await apiClient.post("/auth", {
        wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
        password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
      });

      web / routes / wallet / create - client - wallet.js;

      const { token } = data.data;

      apiClient.setAuthToken(token);
    } catch (err) {
      console.log(err);

      return res.status(500).send({
        error: err,
      });
    }
  }

  try {
    const wallet = await apiClient.post("/wallets", {
      wallet: walletName,
    });

    console.log(wallet);

    const meta1 = await updateMetafield(
      session,
      "$app:wallet",
      "walletId",
      wallet.data.id,
      "string",
    );
    const meta2 = await updateMetafield(
      session,
      "$app:wallet",
      "shopName",
      shopName,
      "string",
    );
    const meta3 = await updateMetafield(
      session,
      "$app:wallet",
      "shopOwnerName",
      shopOwnerName,
      "string",
    );
    const meta4 = await updateMetafield(
      session,
      "$app:wallet",
      "shopEmail",
      shopEmail,
      "string",
    );

    console.log(meta1, meta2, meta3, meta4);

    return res.status(200).send({ data: wallet.data });
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      error: err,
    });
  }
};
