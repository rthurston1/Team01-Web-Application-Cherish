import DayController from "../controller/DayController.js";
import ModelFactory from "../model/ModelFactory.js";
import { createMockRequestResponse } from "../spec/helpers/mockRequestResponse.js";
import { debugLog } from "../../config/debug.js";
import e from "express";

describe("DayController", () => {
  let mockSQLiteModel;

  const errorMessage = (methodName) => `Error in DayController.${methodName}`;

  beforeAll(async () => {
    mockSQLiteModel = {
      // Spy functions
      getAllUsers: jasmine.createSpy("getAllUsers"),
      getUser: jasmine.createSpy("getUser"),
      getUserData: jasmine.createSpy("getUserData"),
      loginUser: jasmine.createSpy("loginUser"),
      saveUser: jasmine.createSpy("saveUser"),
    };
    spyOn(ModelFactory, "getModel").and.returnValue(
      Promise.resolve(mockSQLiteModel)
    );
    await DayController.initializeModel("sqlite-fresh");
  });

  beforeEach(async () => {
    // output the name of each test case
    debugLog(`\tTEST START`, "TEST");
  });

  afterEach(async () => {
    debugLog(`\tTEST COMPLETE`, "TEST");
  });

  describe("getAllUsers", () => {
    it("should return all users from the model", async () => {
      const { req, res } = createMockRequestResponse();
      const mockData = {
        success: true,
        data: [{ username: "testUser" }, { username: "testUser2" }],
      };
      mockSQLiteModel.getAllUsers.and.returnValue(Promise.resolve(mockData));

      await DayController.getAllUsers(req, res);

      expect(mockSQLiteModel.getAllUsers).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return a rejected promise if no users found", async () => {
      const { req, res } = createMockRequestResponse();
      const mockData = { success: false, error: "No users found" };
      mockSQLiteModel.getAllUsers.and.returnValue(Promise.resolve(mockData));

      await DayController.getAllUsers(req, res);

      expect(mockSQLiteModel.getAllUsers).toHaveBeenCalled();
      expect(res.setHeader).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should handle errors and send a 500 status", async () => {
      const { req, res } = createMockRequestResponse();
      const mockError = errorMessage("getAllUsers");
      mockSQLiteModel.getAllUsers.and.returnValue(Promise.reject(mockError));

      await DayController.getAllUsers(req, res);

      expect(mockSQLiteModel.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(mockError);
    });

    it("should give an error if the parameter is invalid", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockError = errorMessage("getAllUsers");
      mockSQLiteModel.getAllUsers.and.returnValue(Promise.reject(mockError));

      await DayController.getAllUsers(null, res);

      expect(mockSQLiteModel.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getUser", () => {
    it("should return a user by username from the model", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = {
        success: true,
        data: { username: "testUser", password: "testPassword" },
      };
      mockSQLiteModel.getUser.and.returnValue(Promise.resolve(mockData));

      await DayController.getUserByUsername(req, res);

      expect(mockSQLiteModel.getUser).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return all data for a user if the user exists", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = {
        success: true,
        data: { username: "testUser", data: [{ date_id: "1-1-11" }] },
      };
      const mockData2 = {
        success: true,
        data: { username: "testUser" },
      };

      mockSQLiteModel.getUserData.and.returnValue(Promise.resolve(mockData));

      await DayController.getUserData(req, res);

      expect(mockSQLiteModel.getUserData).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).not.toHaveBeenCalledWith(mockData2);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return a rejected promise if the user does not exist", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = { success: false, error: "User not found" };
      mockSQLiteModel.getUser.and.returnValue(Promise.resolve(mockData));

      await DayController.getUserByUsername(req, res);

      expect(mockSQLiteModel.getUser).toHaveBeenCalled();
      expect(res.setHeader).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should handle errors and send a 500 status", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockError = errorMessage("getUser");
      mockSQLiteModel.getUser.and.returnValue(Promise.reject(mockError));

      await DayController.getUserByUsername(req, res);

      expect(mockSQLiteModel.getUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(
        "Error retrieving data from DayController.getUserByUsername"
      );
    });
  });

  describe("loginUser", () => {
    it("should return the user if the login is successful", async () => {
      const { req, res } = createMockRequestResponse();
      req.body = { username: "testUser", password: "testPassword" };
      const mockData = { success: true, user: { username: "testUser" } };
      mockSQLiteModel.loginUser.and.returnValue(Promise.resolve(mockData));

      await DayController.loginUser(req, res);

      expect(mockSQLiteModel.loginUser).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
    it("should return 401 status on invalid password", async () => {
      const { req, res } = createMockRequestResponse();
      req.body = { username: "testUser", password: "wrongPassword" };
      const mockData = { success: false, error: "Invalid password" };
      mockSQLiteModel.loginUser.and.returnValue(Promise.resolve(mockData));

      await DayController.loginUser(req, res);

      expect(mockSQLiteModel.loginUser).toHaveBeenCalledWith(
        "testUser",
        "wrongPassword"
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Invalid password",
      });
    });
    it("should handle errors and send a 500 status", async () => {
      const { req, res } = createMockRequestResponse();
      req.body = { username: "testUser", password: "testPassword" };
      const mockError = errorMessage("loginUser");
      mockSQLiteModel.loginUser.and.returnValue(Promise.reject(mockError));

      await DayController.loginUser(req, res);

      expect(mockSQLiteModel.loginUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("postUserData", () => {
    it("should save a user to the model", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = { success: true, data: { username: "testUser" } };
      mockSQLiteModel.saveUser.and.returnValue(Promise.resolve(mockData));

      await DayController.postUserData(req, res);

      expect(mockSQLiteModel.saveUser).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);

      // Confirm user was saved
      await DayController.getUserByUsername(req, res);

      expect(res.json).toHaveBeenCalledWith(mockData);
    });
    it("should save all data for a user if the user exists (mock)", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = {
        success: true,
        data: { username: "testUser", data: [{ date_id: "1-1-11" }] },
      };
      const mockData2 = {
        success: true,
        data: { username: "testUser" },
      };

      mockSQLiteModel.saveUser.and.returnValue(Promise.resolve(mockData));

      await DayController.postUserData(req, res);

      expect(mockSQLiteModel.saveUser).toHaveBeenCalledWith("testUser");
      expect(res.json).toHaveBeenCalledWith(mockData);

      // Confirm user's data was saved (call getUserData once implemented)
      mockSQLiteModel.getUserData.and.returnValue(Promise.resolve(mockData2));

      await DayController.getUserData(req, res);

      expect(mockSQLiteModel.getUserData).toHaveBeenCalledWith("testUser");
      expect(res.json).toHaveBeenCalledWith(mockData2);
    });
  });

  describe("getUserData", () => {
    it("should return all data for a user if the user exists", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = {
        success: true,
        data: { username: "testUser", data: [{ date_id: "1-1-11" }] },
      };

      const invalidMockData = { success: true, data: { username: "testUser" } };

      mockSQLiteModel.getUserData.and.returnValue(Promise.resolve(mockData));

      await DayController.getUserData(req, res);

      // debugLog(mockData.data.username, "JASMINE");

      expect(mockSQLiteModel.getUserData).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(res.json).not.toHaveBeenCalledWith(invalidMockData);
    });
    it("should return a rejected promise if the user does not exist", async () => {
      const { req, res } = createMockRequestResponse();
      req.params = { username: "testUser" };
      const mockData = { success: false, error: "User not found" };
      mockSQLiteModel.getUserData.and.returnValue(Promise.resolve(mockData));

      await DayController.getUserData(req, res);

      expect(mockSQLiteModel.getUserData).toHaveBeenCalled();
      expect(res.setHeader).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

  // describe("getAllData", () => {
  //   it("should return all data from the model", async () => {
  //     const { req, res } = createMockRequestResponse();
  //     const mockData = [{ date_id: "1-1-11" }];
  //     mockModel.read.and.returnValue(Promise.resolve(mockData));

  //     await DayController.getAllData(req, res);

  //     expect(mockModel.read).toHaveBeenCalled();
  //     expect(res.setHeader).toHaveBeenCalledWith(
  //       "Content-Type",
  //       "application/json"
  //     );
  //     expect(res.json).toHaveBeenCalledWith(mockData);
  //   });

  //   it("should handle errors and send a 500 status", async () => {
  //     const { req, res } = createMockRequestResponse();
  //     const mockError = "Error retrieving data from DayController.getAllData";
  //     mockModel.read.and.returnValue(Promise.reject(mockError));

  //     await DayController.getAllData(req, res);

  //     expect(mockModel.read).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.status().send).toHaveBeenCalledWith(mockError);
  //   });
  // });
});
