import {
  AlphaCard,
  Page,
  Layout,
  Checkbox,
  Text,
  Button,
  TextField,
  Frame,
  Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";

export default function ConnectWallet() {
  const { t } = useTranslation();

  const [walletName, setWalletName] = useState("");
  const [walletPassword, setWalletPassword] = useState("");

  // error state
  const [walletNameError, setWalletNameError] = useState(false);
  const [walletPasswordError, setWalletPasswordError] = useState(false);

  const [walletNameDisabled, setWalletNameDisabled] = useState(false);
  const [walletPasswordDisabled, setWalletPasswordDisabled] = useState(false);

  const [disabled, setDisabled] = useState(true);

  // change disabled on validation

  useEffect(() => {
    if (walletNameDisabled || walletPasswordDisabled) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [walletNameDisabled, walletPasswordDisabled]);

  // handle changes

  const handleWalletNameChange = useCallback(
    (value) => setWalletName(value),
    []
  );

  const handleWalletPasswordChange = useCallback(
    (value) => setWalletPassword(value),
    []
  );

  // validation

  const validateWalletName = () => {
    if (walletName == "") {
      setWalletNameError("Wallet name must not be empty");
      setWalletNameDisabled(true);
    } else {
      setWalletNameError(false);
      setWalletNameDisabled(false);
    }
  };

  const validateWalletPassword = () => {
    if (walletPassword == "") {
      setWalletPasswordError("Wallet password must not be empty");
      setWalletPasswordDisabled(true);
    } else {
      setWalletPasswordError(false);
      setWalletPasswordDisabled(false);
    }
  };

  return (
    <Page>
      <TitleBar
        title={t("ConnectWallet.title")}
        secondaryActions={[
          {
            content: "Back",
            onAction: null,
          },
        ]}
      />
      <Layout>
        <Layout.AnnotatedSection title={t("ConnectWallet.SectionHeader")}>
          <AlphaCard>
            <TextField
              label={t("ConnectWallet.Input1Label")}
              placeholder={t("ConnectWallet.Input1Placeholder")}
              autoComplete="none"
              value={walletName}
              onChange={handleWalletNameChange}
              error={walletNameError}
              onBlur={validateWalletName}
            />
            <div style={{ marginTop: "16px" }}>
              <TextField
                label="Wallet password"
                placeholder="Enter wallet password here"
                type="password"
                autoComplete="none"
                value={walletPassword}
                onChange={handleWalletPasswordChange}
                error={walletPasswordError}
                onBlur={validateWalletPassword}
              />
            </div>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <div style={{ marginTop: "32px", width: "100%" }}>
          <div style={{ marginTop: "32px", width: "100%" }}>
            <Button primary fullWidth size="large" disabled={disabled}>
              Create wallet
            </Button>
          </div>
        </div>
      </Layout>
    </Page>
  );
}
