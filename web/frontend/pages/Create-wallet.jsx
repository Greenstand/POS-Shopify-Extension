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

  const [storeEmail, setStoreEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletPassword, setWalletPassword] = useState("");

  const handleStoreEmailChange = useCallback(
    (value) => setStoreEmail(value),
    []
  );

  const handleStoreNameChange = useCallback((value) => setStoreName(value), []);

  const handleWalletNameChange = useCallback(
    (value) => setWalletName(value),
    []
  );

  const handleWalletPasswordChange = useCallback(
    (value) => setWalletPassword(value),
    []
  );

  return (
    <Page>
      <TitleBar
        title={t("CreateWallet.title")}
        secondaryActions={[
          {
            content: "Back",
            onAction: null,
          },
        ]}
      />
      <Layout>
        <Layout.AnnotatedSection
          title="Store details"
          description="Greenstand needs this information to contact your store"
        >
          <AlphaCard>
            <TextField
              label="Store name"
              placeholder="Enter store name here"
              autoComplete="none"
              value={storeName}
              onChange={handleStoreNameChange}
            />
            <div style={{ marginTop: "16px" }}>
              <TextField
                label="Store email"
                type="email"
                placeholder="Enter store email here"
                autoComplete="email"
                helpText="We’ll use this address if we need to contact you about your account."
                value={storeEmail}
                onChange={handleStoreEmailChange}
              />
            </div>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Wallet details"
          description="Greenstand needs this information to save your wallet"
        >
          <AlphaCard>
            <TextField
              label="Wallet name"
              placeholder="Enter wallet name here"
              autoComplete="none"
              value={walletName}
              onChange={handleWalletNameChange}
            />
            <div style={{ marginTop: "16px" }}>
              <TextField
                label="Wallet password"
                placeholder="Enter wallet password here"
                type="password"
                autoComplete="none"
                value={walletPassword}
                onChange={handleWalletPasswordChange}
              />
            </div>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <div style={{ marginTop: "32px", width: "100%" }}>
          <Button primary fullWidth size="large">
            Create wallet
          </Button>
        </div>
      </Layout>
    </Page>
  );
}
