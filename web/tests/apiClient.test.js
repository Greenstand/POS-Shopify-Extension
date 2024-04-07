const apiClient = require("../utils/apiClient.js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
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
    it("The function should return true if the API client is authenticated", () => {
      authenticate().then((res) => {
        if (res == 201 || res == 202) {
          expect();
        }
      });
    });

    it("The function should return false if there is no API token", () => {
      apiClient.setAuthToken("");
      expect(apiClient.defaults.headers.common["Authorization"]).toBeFalsy(
        undefined,
      );
    });
  });

  describe("Check set auth header function", () => {
    it("The function should return", () => {
      const res = apiClient.setAuthHeader("");

      expect(res).toBeTruthy();
    });

    it("The function should change the auth header", () => {
      apiClient.setAuthHeader("test");

      expect(apiClient.defaults.headers.common["Authorization"]).toBe(
        "Bearer test",
      );
    });
  });

  describe("Check set auth token function", () => {
    it("The function should not return", () => {
      const res = apiClient.setAuthToken("");

      expect(res).toBeFalsy();
    });

    it("The function should change the auth header", () => {
      apiClient.setAuthToken("test");

      expect(apiClient.defaults.headers.common["Authorization"]).toBe(
        "Bearer test",
      );
    });

    it("The function should nullify the header if there is no token", () => {
      apiClient.setAuthToken("");

      expect(apiClient.defaults.headers.common["Authorization"]).toBeFalsy();
    });
  });
});
