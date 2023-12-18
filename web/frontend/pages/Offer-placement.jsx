import React from "react";

import { Page, Frame, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const OfferPlacement = () => {
  return (
    <Page fullWidth>
      <TitleBar title="Offer placement" />
      <Frame>
        <Layout></Layout>
      </Frame>
    </Page>
  );
};

export default OfferPlacement;
