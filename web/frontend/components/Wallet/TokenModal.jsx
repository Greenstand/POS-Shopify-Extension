import { Text, Modal, Toast } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";

export default function TokenModal({
  activator,
  modal,
  closeModal,
  tokenQuantity,
}) {
  const { t } = useTranslation();

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Tokens transferred" onDismiss={toggleActive} duration={5000} />
  ) : null;

  return (
    <>
      <Modal
        activator={activator}
        open={modal}
        onClose={closeModal}
        title={t("Wallet.modalHeading", {
          tokenQuantity,
        })}
        primaryAction={{
          content: t("Wallet.modalPrimaryButton"),
          onAction: () => {
            closeModal();
            setTimeout(toggleActive, 3000)
          }
        }}
        secondaryActions={[
          {
            content: t("Wallet.modalSecondaryButton"),
            onAction: closeModal,
          },
        ]}
      >
        <Modal.Section>
          <Text variant="bodyMd">{t("Wallet.modalBody")}</Text>
        </Modal.Section>
      </Modal>
      {toastMarkup}
    </>
  );
}
