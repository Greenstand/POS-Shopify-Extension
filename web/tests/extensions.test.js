import apiClient from "../utils/apiClient.js";
import "dotenv/config";

console.log("extensions.test.js");
console.log("Starting tests...");
console.log("----------------------------------------", "\n");

let passed_tests = 0;
let failed_tests = 0;
let ran_tests = 0;
const total_tests = 1;

const test_1 = async () => {
  try {
    const data = await apiClient.post("/auth", {
      wallet: `${process.env.MAIN_WALLET_NAME}`,
      password: `${process.env.MAIN_WALLET_PASSWORD}`,
    });

    apiClient.defaults.headers.common["TREETRACKER_API_KEY"] =
      process.env.MAIN_WALLET_API_KEY;

    const { token } = data.data;

    apiClient.setAuthToken(token);
  } catch (err) {
    console.log(err);
  }

  try {
    const tokens = await apiClient.get("/tokens", {
      headers: {
        limit: 100,
      },
    });

    console.log(tokens);
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  test_1();

  console.log("Tests complete");
  console.log("----------------------------------------", "\n");

  console.log(`${ran_tests} tests ran`);
  console.log(`${total_tests} tests in total`);
  console.log(`${passed_tests}/${total_tests} tests passed`);
  console.log(`${failed_tests}/${total_tests} tests failed`);
})();
