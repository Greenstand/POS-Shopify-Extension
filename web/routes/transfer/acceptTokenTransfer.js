import apiClient from "../../utils/apiClient.js";

// ! func: acceptTransfer (3 params)
// ? req, res
// * CRUD type: post
// * return value: null

export const acceptTransfer = async (req, res) => {
  const { transferId } = req.body;

  try {
    const data = await apiClient.post("/auth", {
      wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
      password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
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
    const transfer = await apiClient.post(`/transfers/${transferId}/accept`);

    console.log("Trasfer accepted:", transfer.data);
    return res.status(200).send({ data: transfer.data });
  } catch (err) {
    console.log("Error accepting tranfer:", err);

    return res.status(500).send({
      error: err,
    });
  }
};
