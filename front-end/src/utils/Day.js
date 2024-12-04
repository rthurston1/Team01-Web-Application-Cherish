import { getToday } from "./dateUtils.js";
import { Emotion } from "./Emotion.js";

class Day {
  _date_id;
  _emotions;
  _rating;
  _journal;

  constructor(date_id = getToday(), emotions = [], rating = 0, journal = "") {
    this.setDateId(date_id);
    this.setEmotions(emotions);
    this.setRating(rating);
    this.setJournal(journal);
  }

  setDateId(date_id) {
    const datePattern = /^\d?\d-\d?\d-\d{4}$/;
    if (!datePattern.test(date_id)) {
      throw new Error("Invalid date format. Please use (M)M-(D)D-YYYY.");
    }
    this.date_id = date_id;
  }

  setEmotions(emotions) {
    if (!Array.isArray(emotions)) {
      throw new Error("Invalid data type. Emotions must be an array.");
    } else if (
      emotions.length > 0 &&
      emotions.every((emotion) => emotion instanceof Emotion)
    ) {
      this.emotions = emotions;
    }
    this.emotions = [];
  }

  setRating(rating) {
    if (isNaN(rating) || rating < 0 || rating > 10) {
      throw new Error("Rating must be between 0 and 10.");
    }
    this.rating = rating;
  }

  setJournal(journal) {
    if (typeof journal !== "string") {
      throw new Error("Journal must be a string.");
    }
    if (journal.length > 2000) {
      throw new Error("Journal must be at most 2000 characters.");
    }

    this.journal = journal;
  }
  getDateId() {
    return this._date_id;
  }

  getEmotions() {
    return this._emotions;
  }

  getRating() {
    return this._rating;
  }

  getJournal() {
    return this._journal;
  }
}

export { Day };
