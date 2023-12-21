import { useEffect, useState } from "react";
import {
  extend,
  render,
  useExtensionInput,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Text,
  TextContainer,
  TextBlock,
  Layout,
  View,
  Form,
  TextField,
} from "@shopify/post-purchase-ui-extensions-react";

// For local development, replace APP_URL with your local tunnel URL.
const APP_URL = "https://pride-ferry-sensitive-newspapers.trycloudflare.com";

// Preload data from your app server to ensure that the extension loads quickly.
extend(
  "Checkout::PostPurchase::ShouldRender",
  async ({ inputData, storage }) => {
    await storage.update({ offer: "offer" });

    // For local development, always show the post-purchase page
    return { render: true };
  }
);

render("Checkout::PostPurchase::Render", () => <App />);

export function App() {
  const { storage, inputData, calculateChangeset, applyChangeset, done } =
    useExtensionInput();
  const [loading, setLoading] = useState(true);
  const [calculatedPurchase, setCalculatedPurchase] = useState();

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                voluptatum maxime asperiores? Iure quidem ipsum, placeat
                voluptates ea officiis suscipit quasi animi! Nihil iure
                molestias laboriosam ut aliquam deleniti eius.
              </TextBlock>
            </TextContainer>
            <Form>
              <TextField label="Wallet name" />
            </Form>
            <Button
              submit
              onPress={() => {
                return null;
              }}
            >
              Create wallet
            </Button>
          </BlockStack>
        </Layout>
      </BlockStack>
    </>
  );
}
