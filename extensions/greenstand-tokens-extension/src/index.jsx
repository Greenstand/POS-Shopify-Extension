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
const APP_URL = "https://fully-participation-nba-conclude.trycloudflare.com/";

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
  const { inputData, done } = input;
  const [loading, setLoading] = useState(false);
  const [tokensReceived, setTokensReceived] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  const [walletName, setWalletName] = useState("");
  const [optIn, setOptIn] = useState(true);

  const changeOptIn = useCallback((newValue) => setOptIn(newValue));
  const changeWalletName = useCallback((newValue) => setWalletName(newValue));

  console.log(input);

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
    const wallet = await fetch(`${APP_URL}/api/create-client-wallet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletName,
      }),
    }).then((response) => response.json());

    if (wallet.error) {
      if (wallet.error.status === 401 || 415) {
        setLoading(false);
        return setError(
          "Sorry, there has been an internal server error. Please try again later."
        );
      }

      if (wallet.error.status === 422) {
        setLoading(false);
        return setError(
          "Please enter a name for the wallet. If you have, this is a server error. Please try again later."
        );
      }

      if (wallet.error.status === 409) {
        setLoading(false);
        return setError("Wallet already exists");
      }
    }

    const tokens = await fetch(`${APP_URL}/api/get-tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    const token_id = tokens.tokens[0].id;

    const init = await fetch(`${APP_URL}/api/initiate-token-transfer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderWallet: "GreenstandEscrow",
        receiverWallet: walletName,
        tokens: [token_id],
        bundleSize: null,
      }),
    }).then((response) => response.json());

    if (init.error) {
      if (init.error.status === 401 || 403 || 404 || 409 || 415 || 422 || 500) {
        setLoading(false);
        return setError(
          "Sorry, there has been an internal server error. Please try again later."
        );
      }
    }

    const accept = await fetch(`${APP_URL}/api/accept-token-transfer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${inputData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transferId: init.data.id,
      }),
    }).then((response) => response.json());

    if (accept.error) {
      if (
        accept.error.status === 401 ||
        403 ||
        404 ||
        409 ||
        415 ||
        422 ||
        500
      ) {
        setLoading(false);
        return setError(
          "Sorry, there has been an internal server error. Please try again later."
        );
      }
    }

    setTokensReceived(true);

    setLoading(false);
  };

  return tokensReceived ? (
    <>
      <View>
        <BlockStack spacing="xloose" alignment="center">
          <Heading>You have received the tokens!</Heading>
          <Link
            external
            to={"https://map.treetracker.org/wallets/" + walletName}
          >
            View your wallet
          </Link>
          <Button submit onPress={done}>
            Move on
          </Button>
        </BlockStack>
      </View>
    </>
  ) : (
    <>
      <CalloutBanner title="Congratulations!" spacing="xloose">
        <Text>With this purchase, you are supporting a tree!</Text>
      </CalloutBanner>
      <BlockStack spacing="loose" alignment="center">
        <Layout
          media={[
            { viewportSize: "large", maxInlineSize: 0.7 },
            { viewportSize: "medium", maxInlineSize: 0.8 },
            { viewportSize: "small", maxInlineSize: 0.9 },
          ]}
        >
          <BlockStack spacing="xloose">
            <TextContainer alignment="center">
              <Heading>How does this work?</Heading>
              <TextBlock>
                You will be given an impact wallet containing one or more tokens
                that represents verified environmental restoration impacts. In
                simpler terms you made it possible that this tree will be able
                to grow and that a community member was involved in planting. It
                is <Text emphasized>completely free.</Text> Fill in the form to
                get a token that represents the tree you are supporting:
              </TextBlock>
              <TextBlock emphasized>
                Powered by{" "}
                <Link external to="https://greenstand.org/">
                  Greenstand.
                </Link>
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
            <BlockStack>
              <Button
                submit
                disabled={disabled}
                onPress={createWallet}
                loading={loading}
                loadingLabel="Loading..."
              >
                Create wallet
              </Button>
              <Button subdued submit onPress={done}>
                No thanks
              </Button>
            </BlockStack>
          </BlockStack>
        </Layout>
      </BlockStack>
    </>
  );
}
