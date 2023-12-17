import React, { useState, useCallback } from "react";

import {
  useApi,
  Modal,
  BlockLayout,
  BlockStack,
  InlineLayout,
  Button,
  InlineSpacer,
  TextField,
  BlockSpacer,
  ListItem,
  List,
} from "@shopify/ui-extensions-react/checkout";

const CreateWallet = () => {
  const { ui } = useApi();

  const [walletName, setWalletName] = useState("");
  const handleWalletNameChange = useCallback(
    (newValue) => setWalletName(newValue),
    []
  );

  return (
    <Modal id="my-modal" padding title="Create wallet">
      <BlockLayout>
        <BlockStack>
          <BlockSpacer />
          <TextField
            label="Wallet name"
            value={walletName}
            onChange={handleWalletNameChange}
          />
          <List>
            <ListItem>Must have 3 or more characters</ListItem>
            <ListItem>
              Can only contain numbers, letters, and . _ , characters
            </ListItem>
          </List>
          <BlockSpacer />
          <InlineLayout columns={["fill", "10%", "10%"]} spacing="base">
            <InlineSpacer />
            <Button
              kind="secondary"
              onPress={() => ui.overlay.close("my-modal")}
            >
              Cancel
            </Button>
            <Button kind="primary" onPress={() => ui.overlay.close("my-modal")}>
              Create
            </Button>
          </InlineLayout>
        </BlockStack>
      </BlockLayout>
    </Modal>
  );
};

export default CreateWallet;
