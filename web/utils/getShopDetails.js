import shopify from "../shopify.js";

export const getShopName = async (session) => {
  try {
    const client = new shopify.api.rest({ session });

    const data = await client.get({ path: "shop" });

    return data.body;
  } catch (err) {
    return { error: err };
  }
};
