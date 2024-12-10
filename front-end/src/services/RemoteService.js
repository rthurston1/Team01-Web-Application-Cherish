import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";
import { debugLog } from "../config/debug.js";
import { endpoints } from "./endpoints.js";

export class RemoteService extends Service {
  constructor() {
    super();

    this.TEST_USER = "testUser";

    // Initialize the database
    this._initCalendar()
      .then(() => {
        this.addSubscriptions();
        debugLog("Database events initialized");
      })
      .catch((error) => {
        debugLog("Failed to initialize database");
        console.error(error);
      });
  }

  addSubscriptions() {
    this.addEvent(Events.StoreData, (data) => this.storeDay(data));
    this.addEvent(Events.RestoreData, (id) => this.restoreDay(id));
    this.addEvent(Events.ClearData, () => this.clearDatabase());
  }

  /** (Function written by Nikolay Ostroukhov @nikozbk)
   * Initializes the calendar by fetching data from the server.
   *
   * This function sends a request to the "/v1/days/" endpoint to retrieve calendar data.
   * If the request is successful, it updates the calendar with the retrieved data and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @returns {Promise<Object>} A promise that resolves with the calendar data if the request is successful, or rejects with an error message if the request fails.
   */
  async _initCalendar() {
    return new Promise(async (resolve, reject) => {
      try {
        const url = new URL(endpoints.getUserData(this.TEST_USER));
        const response = await fetch(url);

        if (response.ok) {
          debugLog(
            `Successfully fetched calendar data for user ${this.TEST_USER}`,
            "SUCCESS"
          );
          const data = await response.json();
          this.update(Events.InitDataSuccess, data);
          resolve(data);
        } else {
          debugLog(
            `Failed to fetch calendar data: ${response.statusText}`,
            "ERROR"
          );
          this.update(Events.InitDataFailed);
          reject("Failed to initialize database");
        }
      } catch (error) {
        this.update(Events.InitDataFailed);
        reject(error);
      }
    });
  }

  /** (Function written by Nikolay Ostroukhov @nikozbk)
   * Restores a specific day's data by fetching it from the server.
   *
   * This function sends a request to the "/v1/days/{date_id}" endpoint to retrieve the data for a specific day.
   * If the request is successful, it updates the calendar with the retrieved data and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @param {string} date_id - The ID of the date to be restored.
   * @returns {Promise<Object>} A promise that resolves with the day's data if the request is successful, or rejects with an error message if the request fails.
   */
  async restoreDay(date_id) {
    return new Promise(async (resolve, reject) => {
      try {
        debugLog(`restoreDay(${date_id})`);
        const response = await fetch(endpoints.getDay(this.TEST_USER, date_id));

        if (response.ok) {
          debugLog(`restoreDay(${date_id}) request.ok`);
          const data = await response.json();
          debugLog(`Successfully restored data for ${date_id}`);
          this.update(Events.RestoredDataSuccess, data);
          resolve(data);
        } else {
          debugLog(`Failed to restore data for ${date_id}`, "INFO");
          this.update(Events.RestoredDataFailed);
          reject("Failed to retrieve data");
        }
      } catch (error) {
        debugLog(`Failed to restore data for ${date_id}`, "ERROR");
        this.update(Events.RestoredDataFailed);
        reject(error);
      }
    });
  }

  /** (Function written by Nikolay Ostroukhov @nikozbk)
   * Stores a specific day's data by sending it to the server.
   *
   * This function sends a PUT request to the "/v1/days/{date_id}" endpoint to store the data for a specific day.
   * If the request is successful, it updates the calendar with a success event and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @param {Object} data - The data to be stored, including the date_id.
   * @returns {Promise<string>} A promise that resolves with a success message if the request is successful, or rejects with an error message if the request fails.
   */
  async storeDay(data) {
    return new Promise(async (resolve, reject) => {
      // stringify the data if needed
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      debugLog(`storeDay(${data.date_id})`);
      try {
        const date_id = data?.date_id || data;
        const url = new URL(endpoints.postUserData(this.TEST_USER, date_id));
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          debugLog(`Successfully stored data for ${data.date_id}`);
          this.update(Events.StoredDataSuccess);
          resolve("Data Stored Successfully");
        } else {
          debugLog(`Failed to store data for ${data.date_id}`);
          this.update(Events.StoredDataFailed);
          reject("Failed to store data");
        }
      } catch (error) {
        debugLog(`Failed to store data for ${data.date_id}`);
        this.update(Events.StoredDataFailed);
        reject("Failed to store data");
      }
    });
  }

  /** (Function written by Nikolay Ostroukhov @nikozbk)
   * Clears the entire database by sending a DELETE request to the server.
   *
   * This function sends a DELETE request to the "/v1/days/" endpoint to clear all the data in the database.
   * If the request is successful, it updates the calendar with a success event and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @returns {Promise<string>} A promise that resolves with a success message if the request is successful, or rejects with an error message if the request fails.
   */
  async clearDatabase() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(endpoints.daysRoot, {
          method: "DELETE",
        });
        if (response.ok) {
          this.update(Events.ClearedDataSuccess);
          resolve("Data Cleared Successfully");
        } else {
          this.update(Events.ClearedDataFailed);
          reject("Failed to clear data");
        }
      } catch (error) {
        this.update(Events.ClearedDataFailed);
        reject(`Failed to clear data: ${error}`);
      }
    });
  }
}
export default RemoteService;
