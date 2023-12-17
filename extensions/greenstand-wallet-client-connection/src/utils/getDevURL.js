const fs = require("fs");

function getCurrentURL() {
  const path = "../../../../shopify.app.toml";

  const data = fs.readFileSync(path, "utf8");
  const lines = data.split("\n");

  const url_line = lines[4];
  const url = url_line.split(" = ")[1].split('"')[1];

  return url;
}

exports.default = getCurrentURL;

getCurrentURL();
