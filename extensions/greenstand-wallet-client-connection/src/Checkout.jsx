import { useEffect, useState } from "react";

import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSubscription,
} from "@shopify/ui-extensions-react/checkout";
import { Spinner } from "@shopify/ui-extensions/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const t = useTranslate();
  const { appMetafields } = useApi();
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState("");

  const offerSub = useSubscription(appMetafields);

  useEffect(() => {
    if (offerSub.length > 0) {
      console.log("offerSub", offerSub);
      setLoading(false);
      const curOffer = offerSub.filter((o) => o.metafield.key == "offer")[0]
        .metafield.value;
      console.log(curOffer);
      setOffer(curOffer);
    }
  }, [offerSub]);

  return (
    <Banner title="Greenstand Tokens Offer">
      {loading ? <Spinner /> : offer}
    </Banner>
  );
}
