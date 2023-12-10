# Greenstand Wallet App

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
2. Log in to the Shopify Partner Account (details on Slack)
3. Log in to the Shopify Stores (details on Slack)


### Installation

1. Fork this repository
2. Clone the fork
3. Get credentials from Slack
4. Create a new branch

### Get help

- [Engineering Handbook](https://greenstand.gitbook.io/engineering)
- Shopify Docs: (https://shopify.dev/docs/apps/getting-started/create)
- Message @SuspenseFallback or Krithin Jay on Slack for help
- Message @dadiorchen or Dadiorchen on Slack help
- Ask for help in the Slack Channel

## Tech Stack

This app combines a number of third party open-source tools:

- [Express](https://expressjs.com/) builds the backend.
- [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.
- [`i18next`](https://www.i18next.com/) and related libraries are used to internationalize the frontend.
  - [`react-i18next`](https://react.i18next.com/) is used for React-specific i18n functionality.
  - [`i18next-resources-to-backend`](https://github.com/i18next/i18next-resources-to-backend) is used to dynamically load app translations.
  - [`@formatjs/intl-localematcher`](https://formatjs.io/docs/polyfills/intl-localematcher/) is used to match the user locale with supported app locales.
  - [`@formatjs/intl-locale`](https://formatjs.io/docs/polyfills/intl-locale) is used as a polyfill for [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) if necessary.
  - [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules) is used as a polyfill for [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) if necessary.

The following Shopify tools complement these third-party tools to ease app development:

- [Shopify API library](https://github.com/Shopify/shopify-node-api) adds OAuth to the Express backend. This lets users install the app and grant scope permissions.
- [App Bridge React](https://shopify.dev/docs/apps/tools/app-bridge/getting-started/using-react) adds authentication to API requests in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [Custom hooks](https://github.com/Shopify/shopify-frontend-template-react/tree/main/hooks) make authenticated requests to the Admin API.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
- [`@shopify/i18next-shopify`](https://github.com/Shopify/i18next-shopify) is a plugin for [`i18next`](https://www.i18next.com/) that allows translation files to follow the same JSON schema used by Shopify [app extensions](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions#how-it-works) and [themes](https://shopify.dev/docs/themes/architecture/locales/storefront-locale-files#usage).


### User Roles: 


- Merchant (admin): Backend user of Shopify customizing the checkout process and adding items to the online store. 
- Prerequisite (Merchant): Needs to have a designated wallet handle with tokens inside. Or create a new wallet by contacting Greenstand Info@greenstand.org (See Notes Section)

### Users Defined:

- Consumer: Person buying something on Shop owners (Merchants) Shopify instance
- Prerequisite (consumer): Needs to go through the cart checkout process and finalize a purchase. Either has an existing wallet (enter wallet name) or gets assigned a new wallet (could be the email address)

### Wallets Defined: 

- Greenstand Shopify Master Wallet:  This is the master wallet created on the Greenstand wallet system that enables the shopify App to create more wallets and create trust relationships to receive tokens from the wallet of the shop owner.

- Consumer Wallet: A wallet created by the Shopify App (Using the Greenstand Shopify Master Wallet above). This wallet is created with a “trust relationship” that enables the wallet to receive tokens from the shop owner’s wallet. Complication: If the consumer already has created an outside of the shopify app, a new relationship must be established and a trust relationship must be sent (later user stories). 

- Merchant Shop Wallet: This is a wallet that is owned by the merchant and designated as the wallet to draw tokens from on the shop. 

### Use case: 
Consumers buy items in the store and on check out opt in to receive tokens. If no wallet is known a new wallet gets created. The wallet created is fully managed by the Greenstand master account and only has a trust relationship to the “merchants master wallet”. That way tokens can not be transferred back into the merchant's master wallet which increases trust and security. 


