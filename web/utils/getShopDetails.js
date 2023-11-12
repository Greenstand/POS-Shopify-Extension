import shopify from "../shopify.js";

export const getShopData = async (session) => {
  try {
    const client = new shopify.api.clients.Rest({ session });

    const data = await client.get({ path: "shop" });

    return data;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
