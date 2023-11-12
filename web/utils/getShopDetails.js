import shopify from "../shopify.js";

export const getShopName = async (session) => {
  const query = `
        {
            shop {
                name
            }
        }
    `;

  try {
    const client = new shopify.api.clients.Graphql({ session });

    const data = await client.query({ data: query });

    return data.body;
  } catch (err) {
    return { error: err };
  }
};
