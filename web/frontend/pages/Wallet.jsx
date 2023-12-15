import {
  AlphaCard,
  Page,
  Layout,
  Text,
  Button,
  Form,
  FormLayout,
  TextField,
  Frame,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useCallback, useRef, useEffect, useState } from "react";
import TokenModal from "../components/Wallet/TokenModal";

import Token from "../assets/Token.svg";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch.js";
import readResponse from "../utils/readResponse";

export default function Wallet() {
  const authFetch = useAuthenticatedFetch();

  const { t } = useTranslation();
  const [tokenQuantity, setTokenQuantity] = useState("1");
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(false);

  const activator = useRef(null);

  useEffect(() => {
    authFetch("/api/auth-wallet", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async ({ body }) => {
        authFetch("/api/get-wallet", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async ({ body }) => {
          const response = await readResponse(body);
          console.log(response);

          if (response.error) {
            if (response.error.code && response.error.code == 404) {
              setLoading(false);
              return setWallet(false);
            }
          }

          setWallet(response.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const validate = () => {
    const num = parseInt(tokenQuantity);

    if (!num) {
      setDisabled(true);
      setError(t("Wallet.TokenEmptyError"));
    } else if (num > 999999999) {
      setDisabled(true);
      setError(t("Wallet.TooManyTokensError"));
    } else {
      setDisabled(false);
      setError(false);
    }
  };

  const handleTokenQuantityChange = useCallback(
    (newValue) => setTokenQuantity(newValue),
    []
  );

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
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
      <Frame>
        <TokenModal
          activator={activator}
          modal={modal}
          closeModal={closeModal}
          tokenQuantity={tokenQuantity}
        />

        <TitleBar title={t("Wallet.title")} />
        <Layout>
          {/* first half */}
          <Layout.Section>
            {/* explanation card */}
            <AlphaCard sectioned>
              <div
                style={{
                  width: "100%",
                  height: "30vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text variant="headingLg" as="h1">
                    {t("Wallet.heading")}
                  </Text>
                  <div style={{ padding: "48px" }}>
                    <img src={Token} width="100px" />
                  </div>
                  <Text variant="bodyMd">
                    <p
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {t("Wallet.body")}
                    </p>
                  </Text>
                </div>
              </div>
            </AlphaCard>
          </Layout.Section>

          {/* number of tokens card */}
          <Layout.Section oneThird>
            <AlphaCard sectioned>
              <div
                style={{
                  width: "100%",
                  height: "30vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text variant="bodyLg">You currently have:</Text>
                <Text variant="heading3xl">
                  <p
                    style={{
                      padding: "24px",
                      fontSize: "48px",
                      fontWeight: "bold",
                    }}
                  >
                    {wallet ? wallet.tokens_in_wallet : "0"}
                  </p>
                </Text>
                <Text>Tokens</Text>

                <div style={{ marginTop: "16px" }}>
                  <Text tone="subdued" variant="bodySm">
                    {wallet
                      ? wallet.tokens_in_wallet < 10
                        ? "Maybe it's time to stock up."
                        : ""
                      : "You do not have a wallet."}
                  </Text>
                </div>
              </div>
            </AlphaCard>
          </Layout.Section>
        </Layout>

        {/* second half */}
        <div style={{ marginTop: "16px" }}>
          <Layout>
            <Layout.Section>
              {/* form card */}
              <AlphaCard sectioned>
                <div
                  style={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text variant="headingLg" as="h1">
                      {t("Wallet.formHeading")}
                    </Text>
                    <div style={{ width: "100%", marginTop: "16px" }}>
                      <Form>
                        <FormLayout>
                          <TextField
                            label={t("Wallet.BuyTokensLabel")}
                            suffix="tokens"
                            type="number"
                            value={tokenQuantity}
                            onChange={handleTokenQuantityChange}
                            autoComplete="off"
                            min={1}
                            error={error}
                            onBlur={validate}
                          />
                          <div style={{ paddingTop: "16px", width: "100%" }}>
                            <Button
                              primary
                              fullWidth
                              onClick={openModal}
                              ref={activator}
                              disabled={disabled}
                            >
                              {t("Wallet.BuyTokensButton")}
                            </Button>
                          </div>
                        </FormLayout>
                      </Form>
                    </div>
                  </div>
                </div>
              </AlphaCard>
            </Layout.Section>

            {/* wallet card */}
            <Layout.Section oneThird>
              <AlphaCard sectioned>
                {wallet ? (
                  <div
                    style={{
                      width: "100%",
                      height: "50vh",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text variant="heading2xl">
                      {t("Wallet.WalletPanelHeader")}
                    </Text>
                    <div
                      style={{
                        paddingTop: "48px",
                        paddingBottom: "48px",
                      }}
                    >
                      <Text variant="bodyLg">
                        <span style={{ fontWeight: "bold" }}>
                          {t("Wallet.WalletName")}
                        </span>{" "}
                        {wallet.wallet}
                      </Text>
                    </div>
                    <Button destructive>{t("Wallet.DisconnectWalletButton")}</Button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "50vh",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text variant="bodyLg">{t("Wallet.NoWallet")}</Text>
                    <div style={{ paddingTop: "16px", paddingBottom: "8px" }}>
                      <Button primary url="/connect-wallet">
                        {t("Wallet.ConnectWalletButton")}
                      </Button>
                    </div>
                    <Button url="/create-wallet">{t("Wallet.CreateWalletButton")}</Button>
                  </div>
                )}
              </AlphaCard>
            </Layout.Section>
          </Layout>
        </div>
      </Frame>
    </Page>
  );
}
