import React, { useEffect, useState, useCallback } from "react";

import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSubscription,
  Text,
  Checkbox,
  SkeletonText,
  BlockLayout,
  BlockStack,
  TextField,
  InlineLayout,
  Button,
} from "@shopify/ui-extensions-react/checkout";
import CreateWallet from "./CreateWallet.jsx";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const t = useTranslate();
  const { appMetafields, ui } = useApi();
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [per, setPer] = useState(null);
  const [item, setItem] = useState(null);

  console.log(appMetafields);

  // form
  const [checked, setChecked] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleCheckChange = useCallback((newValue) => setChecked(newValue), []);
  const handleWalletNameChange = useCallback(
    (newValue) => setWalletName(newValue),
    []
  );

  const validate = () => {
    if (walletName == "") {
      setError("Wallet name cannot be empty");
      setDisabled(true);
    } else {
      setError("");
      setDisabled(false);
    }
  };

  const onInput = () => {
    setDisabled(false);
    setError("");
  };

  // offer

  const offerSub = useSubscription(appMetafields);

  useEffect(() => {
    if (offerSub.length > 0) {
      console.log("offerSub", offerSub);
      setLoading(false);
      const curTokens = offerSub.filter((o) => o.metafield.key == "tokens")[0]
        .metafield.value;
      const curPer = offerSub.filter((o) => o.metafield.key == "per")[0]
        .metafield.value;
      const curItem = offerSub.filter((o) => o.metafield.key == "item")[0]
        .metafield.value;

      setTokens(curTokens);
      setPer(curPer);
      setItem(curItem);
    }
  }, [offerSub]);

  return (
    <Banner title="Greenstand Tokens Offer">
      {loading ? (
        <SkeletonText />
      ) : (
        <BlockLayout>
          <BlockStack>
            {/* <Text>{offer}</Text> */}
            <Checkbox
              id="opt-in"
              name="opt-in"
              value={checked}
              onChange={handleCheckChange}
            >
              Opt in
            </Checkbox>
            {checked ? (
              <>
                <InlineLayout columns={["fill", "20%"]} spacing="base">
                  <TextField
                    label="Greenstand wallet name"
                    placeholder="Enter wallet name here..."
                    maxLength={100}
                    value={walletName}
                    onChange={handleWalletNameChange}
                    onBlur={validate}
                    onInput={onInput}
                    error={error}
                    required
                  />
                  <Button kind="primary" disabled={disabled}>
                    Submit
                  </Button>
                </InlineLayout>
                <Button kind="plain" overlay={<CreateWallet />}>
                  Don't have a wallet with Greenstand?
                </Button>
              </>
            ) : null}
          </BlockStack>
        </BlockLayout>
      )}
    </Banner>
  );
}
