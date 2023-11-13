import apiClient from "../../utils/apiClient.js";
import { getMetafield } from "../../utils/metafield.js";

export const getWallet = async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    var meta = await getMetafield(session, "$app:wallet", "walletId");

    if (!meta) {
      return res
        .status(404)
        .send({ error: { code: 404, message: "No wallet connected to shop" } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }

  try {
    const wallet = await apiClient.get("/wallets/" + meta.value);

    res.status(200).send({ data: wallet.data, error: false });
  } catch (err) {
    console.error(err);

    res.status(err.code).send({ error: err });
  }
};
