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
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";
import CreateWallet from "./CreateWallet.jsx";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const t = useTranslate();
  const api = useApi();
  const { appMetafields, cost } = api;
  const cart = useCartLines();

  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [per, setPer] = useState(null);
  const [item, setItem] = useState(null);

  // form
  const [checked, setChecked] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [isShown, setIsShown] = useState(true);

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
  const subTotalAmount = useSubscription(cost.subtotalAmount);

  useEffect(() => {
    if (offerSub.length > 0) {
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

  useEffect(() => {
    if (tokens && per && item && subTotalAmount && cart) {
      setLoading(false);
      console.log("true");
      console.log(per);

      if (item == "$") {
        if (per > subTotalAmount.amount) {
          setIsShown(false);
        }
      } else {
        const quantitySum = cart.reduce((acc, cur) => acc + cur.quantity, 0);
        console.log(quantitySum);
      }
    }
  }, [tokens, per, item, subTotalAmount, cart]);

  return isShown ? (
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
  ) : null;
}
