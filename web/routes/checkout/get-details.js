import { getMetafield } from "../../utils/metafield.js";
import { namespace } from "./variables.js";

export const getDetails = async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const namespace = "checkoutExtension";

    const meta = getMetafield(session, "");
    res.status(200).send({
      message: "Successfully retrieved values",
      body: {},
      error: false,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
