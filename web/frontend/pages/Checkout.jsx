import {
  AlphaCard,
  Page,
  Layout,
  TextContainer,
  Text,
  Button,
  Form,
  FormLayout,
  TextField,
  Link,
  Frame,
  Modal,
  Select,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";

export default function CreateWallet() {
  const { t } = useTranslation();

  const [tokens, setTokens] = useState("1");
  const [per, setPer] = useState("1");
  const [item, setItem] = useState("$");

  const values = [
    { label: "dollars", value: "$" },
    { label: "items", value: "items" },
  ];

  // handle changes

  const handleTokenChange = useCallback((newValue) => setTokens(newValue), []);
  const handlePerChange = useCallback((newValue) => setPer(newValue), []);
  const handleItemChange = useCallback((newValue) => setItem(newValue), []);

  return (
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
                Greenstand Wallet App makes changes to checkout to allow users
                to purchase tokens from you.
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
                    <Button fullWidth primary>
                      Save
                    </Button>
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
              <Text variant="headingLg">Preview</Text>

              <div style={{ padding: "64px" }}>
                <Text variant="bodyLg">
                  <p style={{ textAlign: "center" }}>
                    Greenstand is planting {tokens ? tokens : 0} trees in your
                    name for every{" "}
                    {(item == "$" ? item : per ? per : "0") +
                      (item == "$" ? (per ? per : "0") : " items")}{" "}
                    {item == "$" ? "worth of items you buy!" : "you buy!"}{" "}
                    <Link>Learn more!</Link>
                  </p>
                </Text>
              </div>
            </div>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
