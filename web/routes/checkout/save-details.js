import { updateMetafield } from "../../utils/metafield.js";

export const saveDetails = async (req, res) => {
  try {
    const type = "single_line_text_field";
    const namespace = "checkoutExtension";
    const key = "offer";
    const { offer } = req.body;
    const session = res.locals.shopify.session;

    console.log(session, namespace, key, offer, type);

    const meta = await updateMetafield(session, namespace, key, offer, type);
    console.log(meta);

    res
      .status(200)
      .send({ message: "Successfully updated value", error: false });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
