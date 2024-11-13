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
        this.addSubscriptions()
      })
      .then(() => {
        console.log("Database initialized")
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
        db.createObjectStore(this.storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject("Error initializing IndexedDB");
      };
    });
  }

  // Returns the Day Object specificed by the id
  async restoreDay(date_id) {

  }

  async storeDay(data) {
    // If Entry does not exist, create new entry

    // Else overwrite entry with new data

    // If there's any error (DO NOT ADD/OVERWRITE)
  }

  // ************************************************************************
  // TODO: Use the following example methods as a guide for our mood services
  // ************************************************************************

  // async storeTask(taskData) {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.db.transaction([this.storeName], 'readwrite');
  //     const store = transaction.objectStore(this.storeName);
  //     const request = store.add(taskData);

  //     request.onsuccess = () => {
  //       this.publish(Events.StoreTaskSuccess, taskData);
  //       resolve('Task stored successfully');
  //     };

  //     request.onerror = () => {
  //       this.publish(Events.StoreTaskFailure, taskData);
  //       reject('Error storing task: ');
  //     };
  //   });
  // }

  // async loadTasksFromDB() {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.db.transaction([this.storeName], 'readonly');
  //     const store = transaction.objectStore(this.storeName);
  //     const request = store.getAll();

  //     request.onsuccess = event => {
  //       const tasks = event.target.result;
  //       tasks.forEach(task => this.publish('NewTask', task));
  //       resolve(tasks);
  //     };

  //     request.onerror = () => {
  //       this.publish(Events.LoadTasksFailure);
  //       reject('Error retrieving tasks');
  //     };
  //   });
  // }

  // async clearTasks() {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.db.transaction([this.storeName], 'readwrite');
  //     const store = transaction.objectStore(this.storeName);
  //     const request = store.clear();

  //     request.onsuccess = () => {
  //       this.publish(Events.UnStoreTasksSuccess);
  //       resolve('All tasks cleared');
  //     };

  //     request.onerror = () => {
  //       this.publish(Events.UnStoreTasksFailure);
  //       reject('Error clearing tasks');
  //     };
  //   });
  // }

  // **TODO**: Implement addSubscriptions with mood-related events
  // addSubscriptions() {
  //   this.subscribe(Events.StoreTask, data => {
  //     this.storeTask(data);
  //   });

  //   this.subscribe(Events.UnStoreTasks, () => {
  //     this.clearTasks();
  //   });
  // }
}
