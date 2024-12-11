import { IDBService } from "./IDBService.js";
import { RemoteService } from "./RemoteService.js";
import { debugLog } from "../config/debug.js";

class StorageServiceFactory {
  static services = {};

  static getService(type) {
    if (!this.services[type]) {
      switch (type) {
        case "IDB":
          debugLog("Creating IDBService", "INFO");
          return new IDBService();
        case "Remote":
          debugLog("Creating RemoteService", "INFO");
          return new RemoteService();
        default:
          throw new Error("Invalid storage service type");
      }
    }
    return this.services[type];
  }
}
export default StorageServiceFactory;
