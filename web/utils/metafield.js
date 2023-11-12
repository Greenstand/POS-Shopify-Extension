import shopify from "../shopify.js";

export async function createMetafield(session, namespace, key, value, type) {
  try {
    const metafield = new shopify.api.rest.Metafield({ session: session });
    metafield.namespace = namespace;
    metafield.key = key;
    metafield.value = value;
    metafield.type = type;

    const res = await metafield.save({
      update: true,
    });

    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getMetafield(session, namespace, key) {
  try {
    const res = await shopify.api.rest.Metafield.all({
      session: session,
      namespace: namespace,
      key: key,
    });

    return res.data[0];
  } catch (err) {
    console.error(err);
    return err;
  }
}
