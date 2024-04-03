import jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import "dotenv/config";

// ! func: checkExtensionRequest (3 params)
// ? req
// * desc: checks extension request in second auth workflow (see /docs/api/AUTH_WORKFLOW)
// * return value: bool

export const checkExtensionRequest = (req) => {
  // get token

  const auth = req.headers.authorization;
  const ext_token = auth?.split(" ")[1];

  // decode token into parts (complete)

  const payload = jwt.verify(ext_token || "", process.env.CLIENT_SECRET || "", {
    complete: true,
  });

  // join the header and payload with a dot

  const contents = ext_token?.split(".")[0] + "." + ext_token?.split(".")[1];

  // hash by sha-256 algorithm, and then base64-url encode it

  const encoded_payload = createHmac("sha256", process.env.CLIENT_SECRET || "")
    .update(contents, "utf8")
    .digest("base64url");

  return encoded_payload == payload.signature;
};
