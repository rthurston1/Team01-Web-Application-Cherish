/* The Model Factory Lets Us Swap Between Models */
/* We can use the local model at first and swap to the SQLite model later */
import LocalDayModel from "./LocalDayModel.js";
import SQLiteDayModel from "./SQLiteDayModel.js";

class _ModelFactory {
  async getModel(model = "local") {
    switch (model) {
      case "local":
        return LocalDayModel;
      case "sqlite":
        return SQLiteDayModel;
      case "sqlite-fresh":
        await SQLiteDayModel.init(true);
        return SQLiteDayModel;
      default:
        throw new Error("Model not found");
    }
  }
}

export default new _ModelFactory();
