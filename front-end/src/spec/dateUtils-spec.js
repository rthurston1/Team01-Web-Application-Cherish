import {
  getToday,
  convertDateToID,
  getDayOfWeekWord,
  convertDateToISO,
  convertISOToDate,
} from "../utils/dateUtils.js";

describe("Date Utils", () => {
  describe("getToday", () => {
    it("should return today's date in MM-DD-YYYY format by default", () => {
      const today = new Date();
      const expectedDate = `${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}-${today.getFullYear()}`;
      expect(getToday()).toBe(expectedDate);
    });

    it("should return today's date in YYYY-MM-DD format when specified", () => {
      const today = new Date();
      const expectedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      expect(getToday("YYYY-MM-DD")).toBe(expectedDate);
    });

    it("should throw an error for an invalid format", () => {
      expect(() => getToday("DD-MM-YYYY")).toThrowError(
        "Invalid date format. Please use MM-DD-YYYY or YYYY-MM-DD."
      );
    });
  });

  describe("convertDateToISO", () => {
    it("should convert MM-DD-YYYY to YYYY-MM-DD", () => {
      expect(convertDateToISO("12-31-2020")).toBe("2020-12-31");
    });
  });

  describe("convertISOToDate", () => {
    it("should convert YYYY-MM-DD to MM-DD-YYYY", () => {
      expect(convertISOToDate("2020-12-31")).toBe("12-31-2020");
    });
  });

  describe("convertDateToID", () => {
    it("should convert a Date object to MM-DD-YYYY format", () => {
      const date = new Date(2020, 11, 31); // December 31, 2020
      expect(convertDateToID(date)).toBe("12-31-2020");
    });
  });

  describe("getDayOfWeekWord", () => {
    it("should return the day of the week for a Date object", () => {
      const date = new Date(2020, 11, 31); // December 31, 2020
      expect(getDayOfWeekWord(date)).toBe("Thursday");
    });

    it("should return the day of the week for a date string in MM-DD-YYYY format", () => {
      expect(getDayOfWeekWord("12-31-2020")).toBe("Thursday");
    });
  });
});
