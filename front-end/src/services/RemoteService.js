import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";
import { debugLog } from "../config/debug.js";
import { endpoints } from "./endpoints.js";
import { APP_DATA } from "../main.js";
// TODO: import globalUser from loginComponent once loginComponent is merged into main; 

export class RemoteService extends Service {
  constructor() {
    super();

    this.TEST_USER = "testUser";

    // // Initialize the database
    // this._initCalendar()
    //   .then(() => {
    //     this.addSubscriptions();
    //     debugLog("Database events initialized");
    //   })
    //   .catch((error) => {
    //     debugLog("Failed to initialize database");
    //     console.error(error);
    //   });
  }

  addSubscriptions() {
    this.addEvent(Events.StoreData, (data) => this.storeDay(data));
    this.addEvent(Events.RestoreData, (id) => this.restoreDay(id));
    this.addEvent(Events.ClearData, () => this.clearDatabase());
    this.addEvent(Events.StoreEmotion, (data) => this.storeEmotions(data));
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

  /** (Function written by Nikolay Ostroukhov @nikozbk, modified by @rthurston1)
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
    try {
      // Construct the endpoint URL
      const endpoint = `/v1/days/${APP_DATA.getUsername()}/${date_id}`;
  
      // Perform the GET fetch request
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Optional for GET but included for consistency
        },
      });
  
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Failed to retrieve day: ${response.statusText}`);
      }
  
      // Parse and return the JSON response
      const day = await response.json();
      console.log('Day retrieved successfully:', day);
      return day.data;
    } catch (error) {
      console.error('Error retrieving day:', error);
      throw error;
    }
  }
  

  /** (Function written by Jesse Goldman @jss4830)
   * Restores all of a user's data by fetching it from the server.
   *
   * This function sends a request to the "/v1/days/{username}" endpoint to retrieve all of the user's data.
   * If the request is successful, it updates the calendar with the retrieved data and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @returns {Promise<Object>} A promise that resolves with the day's data if the request is successful, or rejects with an error message if the request fails.
   */
  async restoreUserData(){
    const userName = globalUser; 
    return new Promise(async (resolve, reject) => {
      try {
        debugLog(`restoreUserData(${userName})`);
        const request = await fetch(`/v1/days/${userName}`);

        if (request.ok) {
          debugLog(`restoreUserData(${userName}) request.ok`);
          const data = await request.json();
          debugLog(`Successfully restored data for ${userName}`);
          this.update(Events.RestoredDataSuccess, data);
          resolve(data);
        } else {
          debugLog(`Failed to restore data for ${userName}`);
          this.update(Events.RestoredDataFailed);
          reject("Failed to retrieve data");
        }
      } catch (error) {
        debugLog(`Failed to restore data for ${userName}`);
        this.update(Events.RestoredDataFailed);
        reject(error);
      }
    });
  }

  /** (Function written by Nikolay Ostroukhov @nikozbk modified by @rthurston1)
   * Stores a specific day's data by sending it to the server.
   *
   * This function sends a PUT request to the "/v1/days/{date_id}" endpoint to store the data for a specific day.
   * If the request is successful, it updates the calendar with a success event and resolves the promise.
   * If the request fails, it updates the calendar with a failure event and rejects the promise with an error message.
   *
   * @param {Object} data - The data to be stored, including the date_id.
   * @returns {Promise<string>} A promise that resolves with a success message if the request is successful, or rejects with an error message if the request fails.
   */
  async storeDay(day) {
    try {
      const today_id = "2024-12-10"; // Placeholder bc day doesn't contain date_id for some reason
      // Construct the endpoint URL
      const endpoint = `/v1/days/${APP_DATA.getUsername()}/${today_id}`;
  
      const obj = {...day, date_id: today_id};

      // Perform the POST fetch request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the server knows to expect JSON
        },
        body: JSON.stringify(obj), // Convert the day object to JSON
      });
  
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Failed to post day: ${response.statusText}`);
      }
  
      // Parse and return the JSON response
      const storeDay = await response.json();
      console.log('Day posted successfully:', day);
      return storeDay.data;
    } catch (error) {
      console.error('Error posting day:', error);
      throw error;
    }
  }

  async storeEmotions(data) {
    return new Promise(async (resolve, reject) => {
      const date_id = data.data.date_id;
      const emotions = data.emotions;
      debugLog(`storeEmotions(${JSON.stringify(emotions)})`);
      try {
        // Ensure emotions have valid timestamps
        emotions.forEach((emotion) => {
          if (!emotion.timestamp.includes("T")) {
            emotion.timestamp = `${date_id}T${emotion.timestamp}:00.000Z`;
          }
        });

        const url = new URL(endpoints.postEmotions(this.TEST_USER, date_id));
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emotions), // Ensure emotions are stringified
        });
        if (response.ok) {
          debugLog(`Successfully stored emotions for ${date_id}`);
          this.update(Events.StoreEmotionSuccess);
          resolve("Emotion Data Stored Successfully");
        } else {
          debugLog(`Failed to store emotions for ${date_id}`);
          this.update(Events.StoreEmotionFailed);
          reject("Failed to store data");
        }
      } catch (error) {
        debugLog(`Failed to store emotions for ${date_id}`);
        this.update(Events.StoreEmotionFailed);
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


  /** (Function written by Robbie Thurston @rthurston1)
   *  Adds/Registers a user by making a POST request to the "/v1/users/" endpoint.
   *  
   *  @param {*} username the name of the user
   *  @param {*} password password entered
   * 
   *  @returns {Promise<Object>} an object containing the username and encrypted password.
   */
  async registerUser(username, password) {
    const endpoint = "/v1/users"; // API endpoint
    const userData = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON payload
        },
        body: JSON.stringify(userData), // Convert object to JSON
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error ${response.status}: ${errorDetails.message}`);
      }
  
      const user = await response.json();
      console.log("User registered successfully:", user);
      return user.data;
    } catch (error) {
      console.error("Failed to register user:", error.message);
      throw error;
    }
  }
  
  /** (Function written by Robbie Thurston @rthurston1)
   *  Adds/Registers a user by making a POST request to the "/v1/users/" endpoint.
   *  
   *  @param {*} username the name of the user
   *  @param {*} password password entered
   * 
   *  @returns {Promise<Object>} an object containing the username, encrypted password, and all the users data.
   */
  async loginUser(username, password) {
    const endpoint = "/v1/login"; // API endpoint
    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error ${response.status}: ${errorDetails.message}`);
      }

      const user = await response.json();

      if (!user.success) {
        throw new Error(user.error);
      }


      console.log("User registered successfully:", user);
      return user.data;
    } catch (error) {
      console.error("Failed to login user:", error.message);
      throw error;
    }
  }
  
}
export default RemoteService;
