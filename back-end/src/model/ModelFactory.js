/* The Model Factory Lets Us Swap Between Models */
/* We can use the local model at first and swap to the SQLite model later */

class _ModelFactory {
  async getModel(model = "sqlite") {
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

const ModelFactory = new _ModelFactory();
export default ModelFactory;
