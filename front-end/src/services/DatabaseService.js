import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

export class DatabaseService extends Service {
  constructor() {
    super();
    this.dbName = "cherishDB";
    this.storeName = "day";
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        this.addSubscriptions();
        console.log("Database events initialized");
      })
      .catch((error) => {
        console.error("Failed to initialize database:", error);
      });
  }

  addSubscriptions() {
    this.addEvent(Events.StoreData, (data) => this.storeDay(data));
    this.addEvent(Events.RestoreData, (id) => this.restoreDay(id));
    this.addEvent(Events.StoreEmotion, (data, emotion) =>
      this.storeEmotion(data, emotion)
    );
    this.addEvent(Events.RestoreEmotion, (date_id, index) =>
      this.restoreEmotion(date_id, index)
    );
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, { keyPath: "date_id" });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.update(Events.InitDataSuccess);
        resolve(this.db);
      };

      request.onerror = (event) => {
        this.update(Events.InitDataFailed);
        reject(event.target.error);
      };

      request.onblocked = () => {
        console.error(
          "Database open request is blocked. Close other tabs with this site open."
        );
        reject("Database open request is blocked");
      };
    });
  }

  // Helper function to handle database transactions
  async _performTransaction(storeName, mode, operation) {
    const transaction = this.db.transaction([storeName], mode);
    const objectStore = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = operation(objectStore);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  // Helper function to store data
  async _storeData(storeName, data) {
    return this._performTransaction(storeName, "readwrite", (objectStore) =>
      objectStore.put(data)
    )
      .then(() => {
        this.update(Events.StoredDataSuccess);
        return "Data Stored Successfully";
      })
      .catch((error) => {
        this.update(Events.StoredDataFailed);
        throw new Error("Failed to store data: " + error);
      });
  }

  // Helper function to restore data
  async _restoreData(storeName, key) {
    return this._performTransaction(storeName, "readonly", (objectStore) =>
      objectStore.get(key)
    )
      .then((result) => result || { date_id: key })
      .catch((error) => {
        this.update(Events.RestoredDataFailed);
        throw new Error("Failed to retrieve data: " + error);
      });
  }

  // Returns the Day Object specified by the id
  async restoreDay(date_id) {
    return this._restoreData(this.storeName, date_id);
  }

  // Stores the day entry into the database
  async storeDay(data) {
    return this._storeData(this.storeName, data);
  }

  // Stores a specific emotion entry into the database
  async storeEmotion(data, emotion) {
    console.log("Store emotion called");
    const day = data || { date_id: data.date_id, emotions: [] };
    day.emotions = day.emotions || [];
    day.emotions.push(emotion);
    console.log(day.emotions);
    return this.storeDay(day)
      .then(() => {
        this.update(Events.StoreEmotionSuccess);
        return "Emotion Stored Successfully";
      })
      .catch((error) => {
        this.update(Events.StoreEmotionFailed);
        return "Emotion Storage Failed: " + error;
      });
  }

  // Retrieves a specific emotion entry from the database
  async restoreEmotion(date_id, index) {
    return this._restoreData(this.storeName, date_id)
      .then((day) => {
        if (day && day.emotions && day.emotions[index]) {
          return day.emotions[index];
        } else {
          throw new Error("Emotion not found");
        }
      })
      .catch((error) => {
        this.update(Events.RestoreEmotionFailed);
        throw new Error("Failed to retrieve emotion: " + error);
      });
  }

  // Clears all Saved Data from the database
  async clearDatabase() {
    if (!this.db) {
      this.update(Events.ClearedDataFailed);
      return Promise.reject("Database is not open");
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.dbName);

      request.onsuccess = () => {
        this.update(Events.ClearedDataSuccess);
        resolve("All Data Cleared!");
      };

      request.onerror = () => {
        this.update(Events.ClearedDataFailed);
        reject("Failed to Clear Data");
      };
    });
  }
}

export default DatabaseService;
