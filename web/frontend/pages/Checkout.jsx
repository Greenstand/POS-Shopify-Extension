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
  Frame,
  Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";

export default function CreateWallet() {
  const { t } = useTranslation();

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
          <div style={{ marginTop: "16px" }}>
            <AlphaCard>
              <div
                style={{
                  width: "100%",
                  height: "calc(60vh - 16px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text variant="headingLg">Customise checkout</Text>

                <div style={{ marginTop: "32px", width: "80%" }}>
                  <FormLayout>
                    <TextField
                      label="Display text"
                      helpText="The text that tells the client about buying tokens"
                    />
                    <TextField
                      label="Promotion amount"
                      helpText="What the user needs"
                    />
                  </FormLayout>
                </div>
              </div>
            </AlphaCard>
          </div>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard>
            <div
              style={{
                width: "100%",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text variant="headingLg">Preview</Text>

              <div style={{ padding: "64px" }}>
                <Text tone="subdued">Insert image here</Text>
              </div>
            </div>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
