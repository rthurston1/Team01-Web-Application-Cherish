import config from "./config.js";
// do not use with sensitive data
export function debugLog(message) {
  if (config.debug) {
    console.info(`DEBUG: ${message}`);
  }
}
