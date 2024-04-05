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
const APP_URL = "https://sandy-backgrounds-ongoing-disturbed.trycloudflare.com";

// Preload data from your app server to ensure that the extension loads quickly.
extend("Checkout::PostPurchase::ShouldRender", async (api) => {
  // const { metafields } = inputData.shop;
  const { storage } = api;

  // const tokens = metafields.filter((m) => m.key == "tokens")[0];
  // const per = metafields.filter((m) => m.key == "per")[0];
  // const item = metafields.filter((m) => m.key == "item")[0];

  await storage.update({ api, hello: "bye" });

  // For local development, always show the post-purchase page
  return { render: true };
});

render("Checkout::PostPurchase::Render", () => <App />);

export function App() {
  const input = useExtensionInput();
  const { inputData, storage } = input;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  const [walletName, setWalletName] = useState("");
  const [optIn, setOptIn] = useState(true);

  const changeOptIn = useCallback((newValue) => setOptIn(newValue));
  const changeWalletName = useCallback((newValue) => setWalletName(newValue));

  console.log(storage);

  useEffect(() => {
    if (!optIn) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [optIn]);

  const onInput = () => {
    setError(false);
    setDisabled();
  };

  const onBlur = () => {
    if (walletName === "") {
      setDisabled(true);
      setError("Wallet name cannot be empty");
    } else if (!/^[a-zA-Z0-9@.-]*$/g.test(walletName)) {
      setDisabled(true);
      setError(
        "Wallet name can only contain letters, numbers, and @ . - characters"
      );
    } else if (walletName.length < 3 || walletName.length > 30) {
      setDisabled(true);
      setError("Wallet name must be between 3 and 30 characters");
    }
  };

  const createWallet = async () => {
    setLoading(true);
    console.log(inputData.token);
    const wallet = await fetch(`${APP_URL}/api/create-client-wallet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);

        if (response.code == 409) {
          setError("Wallet already exists");
        }
      })
      .catch((err) => {
        console.error(err);
        return error;
      });

    const tokens = await fetch(`${APP_URL}/api/get-tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.error(err);
        return error;
      });
    console.log(wallet);
    setLoading(false);
  };

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
                You will be given an impact wallet containing one or more tokens
                that represents verified environmental restoration impacts. In
                simpler terms you made it possible that this tree will be able
                to grow and that a community member was involved in planting.
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
                  disabled={loading}
                  label="Wallet name"
                  value={walletName}
                  onChange={changeWalletName}
                  onBlur={onBlur}
                  onInput={onInput}
                  error={error}
                />
              </FormLayout>
            </Form>
            <Button
              submit
              disabled={disabled}
              onPress={createWallet}
              loading={loading}
              loadingLabel="Loading..."
            >
              Create wallet
            </Button>
          </BlockStack>
        </Layout>
      </BlockStack>
    </>
  );
}
