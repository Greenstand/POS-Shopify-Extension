export const checkExtensionRequest = (req) => {
  const auth = req.headers.authorization;
  const ext_token = auth?.split(" ")[1];

  const payload = jwt.verify(ext_token || "", process.env.CLIENT_SECRET || "", {
    complete: true,
  });

  const encoded_payload = crypto
    .createHmac("sha256", process.env.CLIENT_SECRET || "")
    .update(ext_token?.split(".")[0] + "." + ext_token?.split(".")[1], "utf8")
    .digest("base64url");

  return encoded_payload == payload.signature;
};
