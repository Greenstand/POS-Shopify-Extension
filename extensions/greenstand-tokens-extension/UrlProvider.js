const fs = require('fs');
const toml = require('toml');

function getCurrentUrl() {
    try {
        // Get the path to shopify.app.toml in the root folder
        const tomlFilePath = './shopify.app.toml';

        // Read the contents of the TOML file
        const tomlContent = fs.readFileSync(tomlFilePath, 'utf8');

        // Parse the TOML content
        const tomlObject = toml.parse(tomlContent);

        // Extract the URL from the parsed TOML
        const url = tomlObject.shopify.app.url;

        return url;
    } catch (error) {
        // Handle any exceptions (e.g., file not found, invalid format)
        console.error(`Error reading shopify.app.toml: ${error.message}`);
        return null;
    }
}

module.exports = getCurrentUrl;
