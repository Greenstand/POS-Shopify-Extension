import apiClient from "../../utils/apiClient.js";

export const acceptTransfer = async (req, res) => {
  const session = res.locals.shopify.session;
  const auth = apiClient.isAuthenticated();

  const { transferId } = req.body;

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
