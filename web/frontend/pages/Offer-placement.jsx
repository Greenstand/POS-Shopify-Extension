import React, { useState, useCallback } from "react";

import {
  Page,
  Frame,
  Layout,
  AlphaCard,
  Text,
  VerticalStack as BlockStack,
  Divider,
  ChoiceList,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const OfferPlacement = () => {
  const homePlacementPoints = [
    {
      label: "Banner",
      value: "banner",
    },
    {
      label: "Modal",
      value: "modal",
    },
  ];

  const productPlacementPoints = [
    {
      label: "Banner",
      value: "banner",
    },
    {
      label: "Modal",
      value: "modal",
    },
    {
      label: "In-built text",
      value: "text",
    },
  ];

  const cartPlacementPoints = [
    {
      label: "Tile",
      value: "tile",
    },
  ];

  const [homeSelected, setHomeSelected] = useState([]);
  const handleHomeChange = useCallback((value) => setHomeSelected(value), []);

  const [productSelected, setProductSelected] = useState([]);
  const handleProductChange = useCallback(
    (value) => setProductSelected(value),
    []
  );

  const [cartSelected, setCartSelected] = useState([]);
  const handleCartChange = useCallback((value) => setCartSelected(value), []);

  return (
    <Page fullWidth>
      <TitleBar title="Offer placement" />
      <Frame>
        <Layout>
          <Layout.Section oneHalf>
            <AlphaCard sectioned>
              <div style={{ height: "90vh", width: "100%" }}>
                <BlockStack>
                  <div style={{ textAlign: "center" }}>
                    <Text variant="headingLg">Offer placement</Text>
                  </div>
                  <br />
                  <br />
                  <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                    <Divider />
                  </div>
                  <Text variant="headingMd">Placement points</Text>
                  <br />
                  <br />
                  <ChoiceList
                    allowMultiple
                    title="Home"
                    choices={homePlacementPoints}
                    selected={homeSelected}
                    onChange={handleHomeChange}
                  />
                  <br />
                  <br />
                  <ChoiceList
                    allowMultiple
                    title="Product page"
                    choices={productPlacementPoints}
                    selected={productSelected}
                    onChange={handleProductChange}
                  />
                  <br />
                  <br />
                  <ChoiceList
                    allowMultiple
                    title="Cart"
                    choices={cartPlacementPoints}
                    selected={cartSelected}
                    onChange={handleCartChange}
                  />
                  <br />
                  <br />
                  <Text>
                    The offer will also always be shown in the checkout section.
                  </Text>
                </BlockStack>
              </div>
            </AlphaCard>
          </Layout.Section>
          <Layout.Section oneHalf>
            <AlphaCard sectioned>
              <div style={{ height: "90vh", width: "100%" }}></div>
            </AlphaCard>
          </Layout.Section>
        </Layout>
      </Frame>
    </Page>
  );
};

export default OfferPlacement;
