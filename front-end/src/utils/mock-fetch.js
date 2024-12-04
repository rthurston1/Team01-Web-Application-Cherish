/**
 * Simulates a network request to the specified URL and returns a Promise
 * that resolves to a mock response object.
 *
 * @function mockfetch
 * @param {string} url The URL to request
 * @param {object} [options] An options object
 * @param {number} [options.delay=1000] The delay (in milliseconds) before
 * resolving the Promise
 * @returns {Promise} A Promise that resolves to a mock response object
 */
export function mockfetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    // Define a delay to simulate network latency (e.g., 1 second)
    const delay = 1000;

    setTimeout(() => {
      // Define a mock response object
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: "OK",
        url,
        json: async () => ({ message: "This is a mock response", url }),
        text: async () => "This is a mock response",
      };

      // Use the URL to simulate failure or success
      if (url.includes("error")) {
        reject(new Error("Network error"));
      } else {
        resolve(mockResponse);
      }
    }, delay);
  });
}
