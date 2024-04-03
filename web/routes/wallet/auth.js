import apiClient from "../../utils/apiClient.js";
import "dotenv/config";

// ! func: authenticateWallet (3 params)
// ? req, res
// * CRUD type: AUTH (special)
// * return value: null

export const authenticateWallet = async (req, res) => {
  if (apiClient.defaults.headers.common["Authorization"]) {
    return res.status(200).send({
      error: false,
      message: "Already authenticated",
    });
  }

  apiClient
    .post("/auth", {
      wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
      password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
    })
    .then((data) => {
      const { token } = data.data;

      apiClient.setAuthToken(token);

      return res.status(201).send({
        error: false,
        message: "Authenticated successfully",
      });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).send({
        error: err,
      });
    });
};
