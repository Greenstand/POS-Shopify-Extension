import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const t = useTranslate();
  const api = useApi();

  console.log(api);

  return (
    <Banner title="Greenstand Tokens Offer">
      Welcome! {api.shop.name} is offering
    </Banner>
  );
}
