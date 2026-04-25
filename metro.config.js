const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add support for mjs and cjs extensions used by react-select
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = withNativeWind(config, { input: "./global.css" });