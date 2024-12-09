import config from "./config.js";
// do not use with sensitive data
export function debugLog(message, label = "DEBUG") {
  if (config.debug) {
    console.info(`[FRONT][${label}]\t${message}`);
  }
}
