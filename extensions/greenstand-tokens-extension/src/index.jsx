import { useEffect, useState, useCallback } from "react";
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
  InlineStack,
  Separator,
  Link,
  Checkbox,
  FormLayout,
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
  const [disabled, setDisabled] = useState(true);

  const [walletName, setWalletName] = useState("");
  const [optIn, setOptIn] = useState(true);

  const changeOptIn = useCallback((newValue) => setOptIn(newValue));
  const changeWalletName = useCallback((newValue) => setWalletName(newValue));

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
            <TextBlock>
              Link to the tree you are supporting:{" "}
              <Link external to="https://greenstand.org/">
                The tree I am supporting
              </Link>
            </TextBlock>
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
              <TextBlock>
                Learn more about Greenstand{" "}
                <Link external to="https://greenstand.org/">
                  here.
                </Link>
              </TextBlock>
              <TextBlock>
                Fill in the form to get a token that represents the tree you are
                supporting:
              </TextBlock>
            </TextContainer>
            <Form>
              <FormLayout>
                <Checkbox value={optIn} onChange={changeOptIn}>
                  I opt in to this program.
                </Checkbox>
                <TextField
                  label="Wallet name"
                  value={walletName}
                  onChange={changeWalletName}
                />
              </FormLayout>
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
