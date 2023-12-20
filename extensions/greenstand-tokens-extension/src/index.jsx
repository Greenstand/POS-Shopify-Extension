/**
 * Extend Shopify Checkout with a custom Post Purchase user experience.
 * This template provides two extension points:
 *
 *  1. ShouldRender - Called first, during the checkout process, when the
 *     payment page loads.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */
import React from "react";
import raw from "../../../shopify.app.toml";

import {
  extend,
  render,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Layout,
  TextBlock,
  TextContainer,
  View,
  Text,
  Form,
  TextField,
  useExtensionInput,
} from "@shopify/post-purchase-ui-extensions-react";

/**
 * Entry point for the `ShouldRender` Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step, and
 * optionally allows data to be stored on the client for use in the `Render`
 * extension point.
 */
extend("Checkout::PostPurchase::ShouldRender", async (props) => {
  const { storage } = props;
  const initialState = await getRenderData();
  const render = true;

  if (render) {
    await storage.update({ foo: "bar" });
  }

  return {
    render,
  };
});

// Simulate results of network call, etc.
async function getRenderData() {}

/**
 * Entry point for the `Render` Extension Point
 *
 * Returns markup composed of remote UI components.  The Render extension can
 * optionally make use of data stored during `ShouldRender` extension point to
 * expedite time-to-first-meaningful-paint.
 */
render("Checkout::PostPurchase::Render", App);

// Top-level React component
export function App({ storage }) {
  // const { storage, extensionPoint } = useExtensionInput();
  const initialState = storage.initialData;

  console.log(storage);
  console.log("raw", raw);

  return (
    <>
      <CalloutBanner title="Congratulations!" spacing="xloose">
        <Text>With this purchase, you are supporting a tree!</Text>
      </CalloutBanner>
      <BlockStack spacing="loose" alignment="center">
        <Layout
          maxInlineSize={0.95}
          media={[
            { viewportSize: "small", sizes: [1, 30, 1] },
            { viewportSize: "medium", sizes: [300, 30, 0.5] },
            { viewportSize: "large", sizes: [400, 30, 0.33] },
          ]}
        >
          <View>
            <Image source="https://cdn.shopify.com/static/images/examples/img-placeholder-1120x1120.png" />
          </View>
          <View />
          <BlockStack spacing="xloose">
            <TextContainer>
              <Heading>How does this work?</Heading>
              <TextBlock>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                rem at odit est doloribus quidem vel voluptatum ipsam tempora
                excepturi asperiores aut illo ea, eius totam, impedit non
                aspernatur quam!
              </TextBlock>
            </TextContainer>
            <Form>
              <TextField label="Email address" />
            </Form>
            <Button
              submit
              onPress={() => {
                return null;
              }}
            >
              Get my wallet
            </Button>
          </BlockStack>
        </Layout>
      </BlockStack>
    </>
  );
}
