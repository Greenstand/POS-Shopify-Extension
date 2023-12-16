import { updateMetafield } from "../../utils/metafield.js";

export const saveDetails = async (req, res) => {
  try {
    const type = "single_line_text_field";
    const namespace = "checkout";
    const key = "offer";
    const { value } = req.body;
    const session = res.locals.shopify.session;

    const meta = updateMetafield(session, namespace, key, value, type);

    res
      .status(200)
      .send({ message: "Successfully updated value", error: false });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
