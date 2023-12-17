import {
  AlphaCard,
  Page,
  Layout,
  Text,
  Button,
  FormLayout,
  TextField,
  Link,
  Frame,
  Spinner,
  Select,
  Toast,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch.js";
import readResponse from "../utils/readResponse.js";

export default function CheckoutSettings() {
  const { t } = useTranslation();
  const authFetch = useAuthenticatedFetch();

  const [tokens, setTokens] = useState("1");
  const [per, setPer] = useState("1");
  const [item, setItem] = useState("$");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonError, setButtonError] = useState("");

  const [toastActive, setToastActive] = useState(false);

  const values = [
    { label: "dollars", value: "$" },
    { label: "items", value: "items" },
  ];

  // toast

  const toggleActive = useCallback(
    () => setToastActive((active) => !active),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast content="Settings saved" onDismiss={toggleActive} duration={5000} />
  ) : null;

  // handle changes

  const handleTokenChange = useCallback((newValue) => setTokens(newValue), []);
  const handlePerChange = useCallback((newValue) => setPer(newValue), []);
  const handleItemChange = useCallback((newValue) => setItem(newValue), []);

  useEffect(() => {
    authFetch("/api/get-checkout-details", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async ({ body }) => {
        const response = await readResponse(body);

        if (response.error) {
          if (response.error.code && response.error.code == 404) {
            setButtonLoading(false);
          }
        }

        const { tokens, per, item } = response.body;

        setTokens(tokens);
        setPer(per);
        setItem(item);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = () => {
    setButtonLoading(true);
    const offer = `Greenstand is planting ${
      tokens ? tokens : 0
    } trees in your name for every ${
      (item == "$" ? item : per ? per : "0") +
      (item == "$" ? (per ? per : "0") : " items")
    } ${item == "$" ? "worth of items you buy!" : "you buy!"}`;

    console.log(offer);

    authFetch("/api/save-checkout-details", {
      method: "POST",
      body: JSON.stringify({
        offer: offer,
        count: per,
        tokens: tokens,
        item: item,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async ({ body }) => {
      const data = await readResponse(body);
      setButtonLoading(false);

      console.log(data);
      if (data.error) {
        setButtonError(data.error.msg);
      } else {
        setToastActive(true);
      }
    });
  };

  return loading ? (
    <Page fullWidth>
      <Frame>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      </Frame>
    </Page>
  ) : (
    <Page fullWidth>
      <TitleBar
        title={t("Checkout.title")}
        secondaryActions={[
          {
            content: "Back",
            onAction: null,
          },
        ]}
      />
      <Frame>
        <Layout>
          <Layout.Section>
            <AlphaCard>
              <div
                style={{
                  width: "100%",
                  height: "25vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text variant="headingLg">
                  Integrate Greenstand Wallet App with Checkout
                </Text>

                <div style={{ padding: "64px" }}>
                  <Text tone="subdued">Insert image here</Text>
                </div>
                <Text>
                  Greenstand Wallet App makes changes to checkout to allow your
                  users to purchase tokens from you.
                </Text>
              </div>
            </AlphaCard>
          </Layout.Section>
          <Layout.Section>
            <AlphaCard>
              <div
                style={{
                  width: "100%",
                  height: "calc(60vh - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text variant="headingLg">Customise checkout</Text>

                <div style={{ marginTop: "32px", width: "80%" }}>
                  <FormLayout>
                    <TextField
                      label="Tokens"
                      type="number"
                      suffix="tokens"
                      value={tokens}
                      onChange={handleTokenChange}
                      min={1}
                      autoComplete="none"
                    />
                    <TextField
                      label="Per"
                      type="number"
                      connectedRight={
                        <Select
                          options={values}
                          value={item}
                          onChange={handleItemChange}
                        />
                      }
                      onChange={handlePerChange}
                      value={per}
                      min={1}
                      autoComplete="none"
                    />
                    <div style={{ marginTop: "32px" }}>
                      <Button
                        fullWidth
                        primary
                        onClick={handleSubmit}
                        loading={buttonLoading}
                      >
                        Save
                      </Button>
                      <p
                        style={{
                          textAlign: "center",
                          color: "red",
                          marginTop: "16px",
                        }}
                      >
                        {buttonError}
                      </p>
                    </div>
                  </FormLayout>
                </div>
              </div>
            </AlphaCard>
          </Layout.Section>
          <Layout.Section oneThird>
            <AlphaCard>
              <div
                style={{
                  width: "100%",
                  height: "calc(60vh - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text variant="headingXl">Preview</Text>

                <div style={{ padding: "64px" }}>
                  <Text variant="bodyLg">
                    <p style={{ textAlign: "center" }}>
                      <Text variant="headingMd">Offer UI:</Text>
                      <br />
                      Greenstand is planting {tokens ? tokens : 0} trees in your
                      name for every{" "}
                      {(item == "$" ? item : per ? per : "0") +
                        (item == "$" ? (per ? per : "0") : " items")}{" "}
                      {item == "$" ? "worth of items you buy!" : "you buy!"}{" "}
                      <Link>Learn more!</Link>
                      <br />
                      <br />
                      <Text variant="headingMd">Checkout UI:</Text>
                      <br />
                      Congratulations! With this purchase you get a tree wallet
                      and {tokens} tokens!
                    </p>
                  </Text>
                </div>
              </div>
            </AlphaCard>
          </Layout.Section>
          {toastMarkup}
        </Layout>
      </Frame>
    </Page>
  );
}
