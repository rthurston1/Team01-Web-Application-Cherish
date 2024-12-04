/* For Local Storage Operations (Get Your Feature Working With This First) */

import { getToday } from "../../../front-end/src/utils/dateUtils.js";
import { Day } from "../../../front-end/src/utils/Day.js";
import { Emotion } from "../../../front-end/src/utils/Emotion.js";
import { isValidDay, isValidEmotion } from "./helpers/localHelpers.js";
import { debugLog } from "../../config/debug.js";

class _LocalDayModel {
  constructor() {
    this.dateData = [];
    this.date_id = getToday();
  }

  // Function Written By Nikolay Ostroukhov @nikozbk
  /**
   * Creates a new day or emotion entry in the dateData array.
   * (1) If the data is null, a new Day instance is created.
   * (2) If the data is not valid, an error is thrown.
   * (3) If the data is a valid Day, it checks if a day with the same date_id already exists.
   * (4) If it does, the existing day is updated; otherwise, the new day is added to the dateData array.
   * (5) If the data is a valid Emotion, it adds the emotion to the corresponding day.
   *
   * @param {Day|Emotion|null} data - The data to create, which can be an instance of Day, Emotion, or null.
   * @returns {Promise<Day|Emotion>} The created or updated day or emotion.
   * @throws {Error} If the data is invalid or if no day is found for the given date_id when adding an emotion. **/
  async create(data = null) {
    debugLog(`LocalDayModel.create`);
    try {
      // *(1) If the data is null, a new Day instance is created.
      if (data === null) {
        debugLog(`Creating new Day instance`);
        data = new Day();
      } else if (!isValidDay(data) && !isValidEmotion(data)) {
        // *(2) If the data is not valid, an error is thrown.
        debugLog(`Invalid data object. Must be an instance of Day or Emotion.`);
        throw new Error(
          "Invalid data object. Must be an instance of Day or Emotion."
        );
      }

      if (isValidDay(data)) {
        // *(3) If the data is a valid Day, it checks if a day with the same date_id already exists.
        debugLog(`Valid Day object`);
        const existingDay = await this.read(data.date_id);
        if (!existingDay) {
          // *(4) If it does, the existing day is updated; otherwise, the new day is added to the dateData array.
          debugLog(`No day found for ${data.date_id}, pushing to dateData`);
          this.dateData.push(data);
        } else {
          // *(4) If it does, the existing day is updated; otherwise, the new day is added to the dateData array.
          debugLog(`Day already exists for ${data.date_id}`);
          debugLog(`Updating existing day to: ${JSON.stringify(data)}`);
          return await this.update(data);
        }
        return data;
      } else if (isValidEmotion(data)) {
        // *(5) If the data is a valid Emotion, it adds the emotion to the corresponding day.
        const day = this.dateData.find((d) => d.date_id === data.date_id);
        if (!day) {
          throw new Error(`No day found for ${data.date_id}`);
        }
        day.emotions.push(data);
        return data;
      } else {
        throw new Error("Invalid data object.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function Written By Nikolay Ostroukhov @nikozbk
  /**
   * Reads the day or days from the dateData array.
   * (1) If an id is provided, it returns the day with the matching date_id.
   * (2) If no id is provided, it returns the entire dateData array.
   *
   * @param {string|null} id - The date_id of the day to read, or null to read all days.
   * @returns {Promise<Day|Array<Day>>} The day with the matching date_id, or the entire dateData array.
   **/
  async read(id = null) {
    debugLog(`LocalDayModel.read`);
    if (id) {
      debugLog(`id: ${id}`);
      // *(1) If an id is provided, it returns the day with the matching date_id.
      debugLog(`Reading day with date_id: ${id}`);
      return this.dateData.find((day) => day.date_id === id);
    }
    // *(2) If no id is provided, it returns the entire dateData array.
    return this.dateData;
  }

  // Function Written By Nikolay Ostroukhov @nikozbk
  /**
   * Updates the specified day in the dateData array.
   * (1) Finds the index of the day with the matching date_id.
   * (2) Updates the day at the found index with the new day data.
   *
   * @param {Day} day - The day to update, which must be an instance of Day.
   * @returns {Promise<Day>} The updated day.
   **/
  async update(day) {
    debugLog(`LocalDayModel.update`);
    // *(1) Finds the index of the day with the matching date_id.
    const index = this.dateData.findIndex((d) => d.date_id === day.date_id);
    if (index === -1) {
      throw new Error(`No day found for ${day.date_id}`);
    }

    // *(2) Updates the day at the found index with the new day data.
    this.dateData[index] = day;
    return day;
  }

  // Function Written By Nikolay Ostroukhov @nikozbk
  /**
   * Deletes the specified day from the dateData array.
   * (1) If no day is provided, it clears the entire dateData array.
   * (2) If a day is provided, it finds the index of the day with the matching date_id.
   * (3) Removes the day at the found index from the dateData array.
   *
   * @param {Day|null} day - The day to delete, or null to clear all days.
   * @returns {Promise<Day|null>} The deleted day, or null if all days are cleared.
   **/
  async delete(day = null) {
    debugLog(`LocalDayModel.delete`);
    // *(1) If no day is provided, it clears the entire dateData array.
    if (day === null) {
      debugLog(`Clearing entire dateData array`);
      this.dateData = [];
      return Promise.resolve({
        status: "Delete successful",
        data: this.dateData,
      });
    }

    // *(2) If a day is provided, it finds the index of the day with the matching date_id.
    const index = this.dateData.findIndex((d) => d.date_id === day.date_id);
    if (index === -1) {
      throw new Error(`No day found for ${day.date_id}`);
    }

    // *(3) Removes the day at the found index from the dateData array.
    debugLog(`Deleting day with date_id: ${day.date_id}`);
    this.dateData.splice(index, 1);
    return day;
  }
}

const LocalDayModel = new _LocalDayModel();

export default LocalDayModel;
