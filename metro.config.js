const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const customConfig = {};

// Wrap the merged Metro config with Reanimated's wrapper
module.exports = wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, customConfig));
