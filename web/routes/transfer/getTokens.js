import apiClient from "../../utils/apiClient.js";

// ! func: initiateTransfer (3 params)
// ? req, res
// * CRUD type: post
// * return value: null

export const getTokens = async (req, res) => {
  try {
    const data = await apiClient.post("/auth", {
      wallet: `${process.env.MAIN_WALLET_NAME}`,
      password: `${process.env.MAIN_WALLET_PASSWORD}`,
    });

    apiClient.defaults.headers.common["TREETRACKER_API_KEY"] =
      process.env.MAIN_WALLET_API_KEY;

    const { token } = data.data;

    apiClient.setAuthToken(token);
  } catch (err) {
    console.log("auth", err.data);

    return res.status(500).send({
      error: err,
    });
  }

  try {
    const tokens = await apiClient.get("/tokens?limit=100");

    return res.status(200).send({
      tokens: tokens.data.tokens,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      error: err,
    });
  }
};
