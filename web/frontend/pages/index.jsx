import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
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
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
