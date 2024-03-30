import apiClient from "../../utils/apiClient.js";

export const createClientWallet = async (req, res) => {
  const session = res.locals.shopify.session;
  const auth = apiClient.isAuthenticated();
  const { walletName } = req.body;

  if (!auth) {
    try {
      const data = await apiClient.post("/auth", {
        wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
        password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
      });

      apiClient.defaults.headers.common["TREETRACKER_API_KEY"] =
        process.env.TREETRACKER_API_KEY;

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

    return res.status(200).send({ data: wallet.data });
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      error: err,
    });
  }
};
