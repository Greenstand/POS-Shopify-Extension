import { getMetafield } from "../../utils/metafield.js";
import { namespace } from "./variables.js";

// ! func: getDetails (3 params)
// ? req, res
// * CRUD type: get
// * return value: null

export const getDetails = async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    console.log(namespace);

    const tokens = await getMetafield(session, namespace, "tokens");
    const per = await getMetafield(session, namespace, "per");
    const item = await getMetafield(session, namespace, "item");

    console.log(tokens, per, item);

    res.status(200).send({
      message: "Successfully retrieved values",
      body: {
        tokens: tokens.value,
        per: per.value,
        item: item.value,
      },
      error: false,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
