import apiClient from "../../utils/apiClient.js";
import { updateMetafield } from "../../utils/metafield.js";

export const createWalletExt = async (walletName) => {
  const auth = apiClient.isAuthenticated();

  if (!auth) {
    try {
      const data = await apiClient.post("/auth", {
        wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
        password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
      });

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

    return "200";
  } catch (err) {
    const code = err.response.data.code;
    console.log("error", code);

    return code.toString();
  }
};
