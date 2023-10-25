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

  const [checked, setChecked] = useState(false);

  // change disabled on validation

  useEffect(() => {
    if (walletNameDisabled || walletPasswordDisabled || !checked) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [walletNameDisabled, walletPasswordDisabled]);

  // handle changes

  const handleCheck = useCallback((newChecked) => setChecked(newChecked), []);

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
    } else if (walletPassword.length < 8) {
      setWalletPasswordError("Wallet password must have at least 8 characters");
      setWalletPasswordDisabled(true);
    } else if (!/[a-z]+[A-Z]+[0-9]+[^a-zA-Z0-9]+/.test(walletPassword)) {
      setWalletPasswordError(
        "Wallet password must have lowercase, uppercase, numeric and special characters"
      );
      setWalletPasswordDisabled(true);
    } else {
      setWalletPasswordError(false);
      setWalletPasswordDisabled(false);
    }
  };

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
        <Layout.AnnotatedSection title="Wallet details">
          <AlphaCard>
            <TextField
              label="Wallet name"
              placeholder="Enter wallet name here"
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
          <Checkbox
            label="I agree to the terms and conditions"
            checked={checked}
            onChange={handleCheck}
          />
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
