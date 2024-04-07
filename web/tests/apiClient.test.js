import apiClient from "../utils/apiClient.js";
import "dotenv/config";
import { describe, it, expect } from "jest";

const authenticate = () => {
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
