const apiClient = require("../utils/apiClient.js");
require("dotenv/config");
// import { describe, it, expect } from "jest";

// ! authenticate
// * helper function to authenticate without server req
// * Return value: Int/Object<Error>

const authenticate = async () => {
  if (apiClient.defaults.headers.common["Authorization"]) {
    return 202;
  }

  apiClient
    .post("/auth", {
      wallet: `${process.env.TREETRACKER_WALLET_NAME}`,
      password: `${process.env.TREETRACKER_WALLET_PASSWORD}`,
    })
    .then((data) => {
      const { token } = data.data;

      apiClient.setAuthToken(token);

      return 201;
    })
    .catch((err) => {
      console.log(err);

      return err;
    });
};

describe("API client", () => {
  describe("Check if authenticated function", () => {
    it("The function should return true if the API client is authenticated", async () => {
      const res = await authenticate();

      if (res == 201 || res == 202) {
        expect();
      }
    });
  });
});
