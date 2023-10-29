import apiClient from "../utils/apiClient.js";
import "dotenv/config";

const API_ROOT = process.env.TREETRACKER_WALLET_API_ROOT;
let passed_tests = 0;
let failed_tests = 0;
let ran_tests = 0;
const total_tests = 3;

console.log("apiClient.test.js");
console.log("Starting tests...");
console.log("----------------------------------------", "\n");

const test_1 = () => {
  ran_tests += 1;

  console.log(apiClient);
  console.log("Test 1 Complete");
  passed_tests += 1;
};

const test_2 = () => {
  ran_tests += 1;

  if (API_ROOT) {
    console.log(API_ROOT);
    console.log("Test 2 Complete");

    passed_tests += 1;
  } else {
    console.log("Test 2 Failed");
    failed_tests += 1;
    throw "Error: No API_ROOT found";
  }
};

const test_3 = async () => {
  ran_tests += 1;

  try {
    const response = await apiClient.get(API_ROOT);
    console.log(response, "\n");

    console.log("Test 3 Complete");
    passed_tests += 1;
  } catch (err) {
    console.log("Test 3 Failed");
    failed_tests += 1;
    throw err;
  }
};

(async () => {
  test_1();
  console.log("----------------------------------------", "\n");

  test_2();
  console.log("----------------------------------------", "\n");

  await test_3();
  console.log("----------------------------------------", "\n");

  console.log("Tests complete");
  console.log("----------------------------------------", "\n");

  console.log(`${ran_tests} tests ran`);
  console.log(`${total_tests} tests in total`);
  console.log(`${passed_tests}/${total_tests} tests passed`);
  console.log(`${failed_tests}/${total_tests} tests failed`);
})();
