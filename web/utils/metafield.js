import shopify from "../shopify.js";

// ! func: getMetafield (3 params)
// ? session: the session generated from Shopify OAuth
// ? namespace: the namespace of the metafield
// ? key: the key of the metafield
// * CRUD type: get

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

// ! func: createMetafield (5 params)
// ? session: the session generated from Shopify OAuth
// ? namespace: the namespace of the metafield
// ? key: the key of the metafield
// ? value: the value of the metafield
// ? type: the type of the metafield (json, string)
// * CRUD type: post

export async function createMetafield(session, namespace, key, value, type) {
  try {
    const metafield = new shopify.api.rest.Metafield({ session: session });
    metafield.namespace = namespace;
    metafield.key = key;
    metafield.value = value;
    metafield.type = type;

    const res = await metafield.save({
      update: false,
    });

    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
}

// ! func: updateMetafield (5 params)
// ? session: the session generated from Shopify OAuth
// ? namespace: the namespace of the metafield
// ? key: the key of the metafield
// ? value: the value of the metafield
// ? type: the type of the metafield (json, string)
// * CRUD type: put

export async function updateMetafield(session, namespace, key, value, type) {
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

// delete
