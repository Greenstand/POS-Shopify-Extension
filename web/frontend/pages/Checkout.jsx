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
          <div>
          <AlphaCard>
            <div
              style={{
                width: "100%",
                height: "60vh",
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
