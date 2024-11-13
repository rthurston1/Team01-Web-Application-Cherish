import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

export class DatabaseService extends Service {
  constructor() {
    super();
    this.dbName = "cherishDB";
    this.storeName = "day";
    this.db = {};

    // Initialize the database
    this.initDB()
      .then(() => {
        this.addSubscriptions();
      })
      .then(() => {
        console.log("Database initialized");
        console.log(this.db);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addSubscriptions() {
    this.addEvent(Events.UpdateDatabase, (data) => this.storeDay(data));
    this.addEvent(Events.RestoreDatabase, (id) => this.storeDay(id));
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {keyPath: "date_id"});
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  // Returns the Day Object specified by the id
  async restoreDay(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(key);

      request.onsuccess = (event) => {
        this.update(Events.RestoredDataSuccess, event.target.result);
        resolve("Data retrieved!");
      };

      request.onerror = () => {
        this.update(Events.RestoredDataFailed)
        reject("Failed to retrieve data");
      }; 
    });
  }

  // Stores the day entry into the database 
  async storeDay(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.put(data); // Updates entry if already exists, adds it otherwise

      request.onsuccess = (event) => {
        this.update(Events.StoredDataSuccess, event.target.result);
        resolve("Data Stored Successfully");
      };

      request.onerror = () => {
        this.update(Events.StoredDataFailed)
        reject("Failed to store data");
      };
    });
  }

  // Clears all Saved Data from the database
  async clearDatabase() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.clear();

      request.onsuccess = () => {
        this.update(Events.ClearedDataSuccess);
        resolve("All Data Cleared!");
      };

      request.onerror = () => {
        this.update(Events.ClearedDataFailed);
        reject("Failed to Clear Data");
      }
    });
  }

}
