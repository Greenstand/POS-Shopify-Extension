import apiClient from "../../utils/apiClient.js";

export const createWallet = async (req, res) => {
  const auth = apiClient.isAuthenticated();

  if (!auth) {
    try {
      const res = apiClient.post("/auth", {
        wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
        password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
      });

      console.log(res);
    } catch (err) {
      console.log(err);

      return res.status(500).send({
        error: err,
      });
    }
  }
};
