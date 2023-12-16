import { getMetafield } from "../../utils/metafield.js";
import { namespace } from "./variables.js";

export const getDetails = async (req, res) => {
  try {
    const session = res.locals.shopify.session;

    const tokens = getMetafield(session, namespace, "tokens");
    const per = getMetafield(session, namespace, "per");
    const item = getMetafield(session, namespace, "item");

    res.status(200).send({
      message: "Successfully retrieved values",
      body: {
        tokens,
        per,
        item,
      },
      error: false,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
