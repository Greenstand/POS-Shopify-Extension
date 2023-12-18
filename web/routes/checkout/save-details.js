import { updateMetafield } from "../../utils/metafield.js";
import { namespace } from "./variables.js";

export const saveDetails = async (req, res) => {
  try {
    const type = "single_line_text_field";
    const key = "offer";
    const { offer, tokens, count, item } = req.body;
    const session = res.locals.shopify.session;

    console.log(session, namespace, key, offer, type);

    await updateMetafield(session, namespace, key, offer, type);
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
