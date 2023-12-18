import {
  Page,
  Layout,
  Link,
  Text,
  AlphaCard,
  CalloutCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <AlphaCard sectioned>
            <div style={{ textAlign: "center" }}>
              <Text as="h2" variant="headingXl">
                {t("HomePage.heading")}
              </Text>
              <div style={{ padding: "64px" }}>
                <Text>Insert image here</Text>
              </div>
              <Text variant="bodyMd">{t("HomePage.body")}</Text>
              <br />
              <Link url="https://greenstand.org/" external>
                {t("HomePage.link")}
              </Link>
            </div>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              paddingTop: "24px",
              paddingBottom: "12px",
            }}
          >
            <Text variant="headingLg">Next steps</Text>
          </div>
          <CalloutCard
            title="Set up your wallet"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Set up your wallet",
              url: "/wallet",
            }}
          >
            <p>Set up your Greenstand wallet by connecting or creating one!</p>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section>
          <CalloutCard
            title="Customize the offers your clients get"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Checkout settings",
              url: "/checkout-settings",
            }}
          >
            <p>
              Change the offer that your clients get, and the placement, styling
              - everything!
            </p>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
