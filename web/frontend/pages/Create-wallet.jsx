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
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";

// api
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch.js";
import readResponse from "../utils/readResponse";

export default function CreateWallet() {
  const { t } = useTranslation();
  const authFetch = useAuthenticatedFetch();

  const [shopEmail, setShopEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopOwnerName, setShopOwnerName] = useState("");
  const [walletName, setWalletName] = useState("");

  // error state
  const [shopEmailError, setShopEmailError] = useState(false);
  const [shopNameError, setShopNameError] = useState(false);
  const [shopOwnerNameError, setShopOwnerNameError] = useState(false);
  const [walletNameError, setWalletNameError] = useState(false);

  const [shopEmailDisabled, setShopEmailDisabled] = useState(false);
  const [shopNameDisabled, setShopNameDisabled] = useState(false);
  const [shopOwnerNameDisabled, setShopOwnerNameDisabled] = useState(false);
  const [walletNameDisabled, setWalletNameDisabled] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(true);

  // get shop name

  useEffect(() => {
    authFetch("/api/get-shop-data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async ({ body }) => {
      const { data } = await readResponse(body);

      console.log(data.body.shop);
      setShopName(data.body.shop.name);
      setShopOwnerName(data.body.shop.shop_owner);
      setLoading(false);
    });
  }, []);

  // change disabled on validation

  useEffect(() => {
    console.log(
      shopNameDisabled,
      shopOwnerNameDisabled,
      shopEmailDisabled,
      walletNameDisabled,
      checked
    );
    if (
      shopNameDisabled ||
      shopEmailDisabled ||
      walletNameDisabled ||
      shopOwnerNameDisabled ||
      !checked
    ) {
      console.log("change");
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    shopNameDisabled,
    shopEmailDisabled,
    walletNameDisabled,
    shopOwnerNameDisabled,
    checked,
  ]);

  // handle changes

  const handleCheck = useCallback((newChecked) => setChecked(newChecked), []);

  const handleShopEmailChange = useCallback((value) => setShopEmail(value), []);

  const handleShopNameChange = useCallback((value) => setShopName(value), []);

  const handleWalletNameChange = useCallback(
    (value) => setWalletName(value),
    []
  );

  const handleShopOwnerNameChange = useCallback(
    (value) => setShopOwnerName(value),
    []
  );

  // validation

  const validateShopName = () => {
    if (shopName == "") {
      setShopNameError("Shop name must not be empty");
      setShopNameDisabled(true);
    } else {
      setShopNameError(false);
      setShopNameDisabled(false);
    }
  };

  const validateShopOwnerName = () => {
    if (shopOwnerName == "") {
      setShopOwnerNameError("Shop owner name must not be empty");
      setShopOwnerNameDisabled(true);
    } else {
      setShopOwnerNameError(false);
      setShopOwnerNameDisabled(false);
    }
  };

  const validateShopEmail = () => {
    if (shopName == "") {
      setShopEmailError("Shop email must not be empty");
      setShopEmailDisabled(true);
    } else if (
      !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(shopEmail)
    ) {
      setShopEmailError("Shop email is invalid");
      setShopEmailDisabled(true);
    } else {
      setShopEmailError(false);
      setShopEmailDisabled(false);
    }
  };

  const validateWalletName = () => {
    if (walletName == "") {
      setWalletNameError("Wallet name must not be empty");
      setWalletNameDisabled(true);
    } else {
      setWalletNameError(false);
      setWalletNameDisabled(false);
    }
  };

  // handle submit

  const handleSubmit = () => {
    authFetch("/api/create-wallet", {
      method: "POST",
      body: JSON.stringify({
        shopName,
        shopOwnerName,
        shopEmail,
        walletName,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async ({ body }) => {
      const data = await readResponse(body);

      console.log(data);
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
          title={t("CreateWallet.Section1Header")}
          description={t("CreateWallet.Section1Desc")}
        >
          <AlphaCard>
            <TextField
              label={t("CreateWallet.Input1Label")}
              placeholder={t("CreateWallet.Input1Placeholder")}
              autoComplete="none"
              value={shopName}
              onChange={handleShopNameChange}
              error={shopNameError}
              onBlur={validateShopName}
            />
            <div style={{ marginTop: "16px" }}>
              <TextField
                type="email"
                label={t("CreateWallet.Input2Label")}
                placeholder={t("CreateWallet.Input2Placeholder")}
                autoComplete="none"
                value={shopOwnerName}
                onChange={handleShopOwnerNameChange}
                error={shopOwnerNameError}
                onBlur={validateShopOwnerName}
              />
            </div>
            <div style={{ marginTop: "16px" }}>
              <TextField
                type="email"
                label={t("CreateWallet.Input3Label")}
                placeholder={t("CreateWallet.Input3Placeholder")}
                autoComplete="email"
                helpText="We’ll use this address if we need to contact you about your account."
                value={shopEmail}
                onChange={handleShopEmailChange}
                error={shopEmailError}
                onBlur={validateShopEmail}
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
              label={t("CreateWallet.Input4Label")}
              placeholder={t("CreateWallet.Input4Placeholder")}
              autoComplete="none"
              value={walletName}
              onChange={handleWalletNameChange}
              error={walletNameError}
              onBlur={validateWalletName}
            />
          </AlphaCard>
        </Layout.AnnotatedSection>
        <div style={{ marginTop: "32px", width: "100%" }}>
          <Checkbox
            label={t("CreateWallet.TermsAndConditions")}
            checked={checked}
            onChange={handleCheck}
          />
          <div style={{ marginTop: "32px", width: "100%" }}>
            <Button
              primary
              fullWidth
              size="large"
              disabled={disabled}
              onClick={handleSubmit}
            >
              {t("CreateWallet.ButtonText")}
            </Button>
          </div>
        </div>
      </Layout>
    </Page>
  );
}
