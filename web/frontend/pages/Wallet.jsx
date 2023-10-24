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
  Link,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useCallback, useRef, useEffect, useState } from "react";
import TokenModal from "../components/Wallet/TokenModal";

import Token from "../assets/Token.svg";

export default function Wallet() {
  const { t } = useTranslation();
  const [tokenQuantity, setTokenQuantity] = useState("1");
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const activator = useRef(null);

  const validate = () => {
    const num = parseInt(tokenQuantity);

    if (!num) {
      setDisabled(true);
      setError("Please enter a value");
    } else if (num > 999999999) {
      setDisabled(true);
      setError("Too many tokens");
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

  return (
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
                    0
                  </p>
                </Text>
                <Text>Tokens</Text>

                {/* {tokenQuantity < 10 ? ( */}
                <div style={{ marginTop: "16px" }}>
                  <Text tone="subdued" variant="bodySm">
                    Maybe it's time to stock up.
                  </Text>
                </div>
                {/* ) : null} */}
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
                            label="Number of tokens"
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
                              destructive
                              fullWidth
                              onClick={openModal}
                              ref={activator}
                              disabled={disabled}
                            >
                              Buy tokens
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
                  <Text variant="bodyLg">You do not have a wallet.</Text>
                  <div style={{ paddingTop: "16px", paddingBottom: "8px" }}>
                    <Button primary>Connect a wallet</Button>
                  </div>
                  <Button url="/create-wallet">Create a wallet</Button>
                </div>
              </AlphaCard>
            </Layout.Section>
          </Layout>
        </div>
      </Frame>
    </Page>
  );
}
