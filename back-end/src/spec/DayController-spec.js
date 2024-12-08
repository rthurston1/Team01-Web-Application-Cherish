import DayController from "../controller/DayController.js";
import ModelFactory from "../model/ModelFactory.js";
import { createMockRequestResponse } from "../spec/helpers/mockRequestResponse.js";

describe("DayController", () => {
  let mockModel;

  beforeAll(async () => {
    mockModel = {
      read: jasmine.createSpy("read"),
      create: jasmine.createSpy("create"),
      delete: jasmine.createSpy("delete"),
      update: jasmine.createSpy("update"),
    };
    spyOn(ModelFactory, "getModel").and.returnValue(Promise.resolve(mockModel));
    DayController.setModel(mockModel);
  });

  describe("getAllData", () => {
    it("should return all data from the model", async () => {
      const { req, res } = createMockRequestResponse();
      const mockData = [{ date_id: "1-1-11" }];
      mockModel.read.and.returnValue(Promise.resolve(mockData));

      await DayController.getAllData(req, res);

      expect(mockModel.read).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should handle errors and send a 500 status", async () => {
      const { req, res } = createMockRequestResponse();
      const mockError = "Error retrieving data from DayController.getAllData";
      mockModel.read.and.returnValue(Promise.reject(mockError));

      await DayController.getAllData(req, res);

      expect(mockModel.read).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(mockError);
    });
  });
});
