import apiClient from "../../utils/apiClient.js";

export const getToken = async (req, res) => {
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
    console.log(err);

    return res.status(500).send({
      error: err,
    });
  }

  try {
    const tokens = await apiClient.get("/tokens", {
      headers: {
        limit: 100,
      },
    });

    console.log(tokens);
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      error: err,
    });
  }
};
