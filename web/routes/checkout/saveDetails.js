import { updateMetafield } from "../../utils/metafield.js";
import { namespace } from "./variables.js";

// ! func: saveDetails (3 params)
// ? req, res
// * CRUD type: put/update
// * return value: null

export const saveDetails = async (req, res) => {
  try {
    const type = "single_line_text_field";
    const { tokens, count, item } = req.body;
    const session = res.locals.shopify.session;

    await updateMetafield(
      session,
      namespace,
      "tokens",
      tokens,
      "number_integer",
    );
    await updateMetafield(session, namespace, "per", count, "number_integer");
    await updateMetafield(session, namespace, "item", item, type);

    res
      .status(200)
      .send({ message: "Successfully updated value", error: false });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
