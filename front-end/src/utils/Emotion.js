import { getToday } from "./dateUtils.js";
class Emotion {
  #emotion_types = this.#getListOfEmotions();

  // Made this a function in case we want to get this from somewhere else
  #getListOfEmotions() {
    return ["Happy", "Sad", "Angry", "Anxious", "Disgusted", "Neutral"];
  }

  /*
        date_id (string): A unique identifier for the date. (Format: MM-DD-YYYY) 
        emotion_id (string): A unique identifier for the emotion. (Emotions: Happy, Sad, Angry, Anxious, Disgusted, Neutral)
        magnitude (number): A ranking system on a scale of 1 to 10 on how strong the emotion is.
        description (string): An explanation to why a user feels the emotion (Not required, can be left empty).
        timestamp (string): The time (hour:minute) an emotion was logged.
    */
  constructor(
    date_id = getToday(),
    emotion_id = "Neutral",
    magnitude = 5,
    description = "",
    timestamp = ""
  ) {
    this.setDateId(date_id);
    this.setEmotionId(emotion_id);
    this.setMagnitude(magnitude);
    this.setDescription(description);
    this.setTimestamp(timestamp);
  }

  setDateId(date_id) {
    const datePattern = /^\d?\d-\d?\d-\d{4}$/;
    if (!datePattern.test(date_id)) {
      throw new Error("Invalid date format. Please use (M)M-(D)D-YYYY.");
    }
    this.date_id = date_id;
  }

  setEmotionId(emotion_id) {
    if (this.#emotion_types.includes(emotion_id)) {
      this.emotion_id = emotion_id;
    } else {
      throw new Error(`Invalid emotion_id: ${emotion_id}.`);
    }
  }

  setMagnitude(magnitude) {
    if (!isNaN(magnitude) && magnitude >= 1 && magnitude <= 10) {
      this.magnitude = magnitude;
    } else {
      throw new Error(
        `Invalid magnitude: ${magnitude}. Must be between 1 and 10.`
      );
    }
  }

  setDescription(description) {
    if (typeof description === "string" && description.length <= 250) {
      this.description = description;
    } else {
      throw new Error(
        `Invalid description: Must be a string with a length up to 250 characters.`
      );
    }
  }
  // A valid timestamp should be in the format "HH:MM" or "H:MM"
  // where HH is the hour in 24-hour format and MM is the minute
  setTimestamp(timestamp) {
    const regex = /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regex.test(timestamp)) {
      this.timestamp = timestamp;
    } else {
      throw new Error(
        `Invalid timestamp: ${timestamp}. Must be in the format "HH:MM" or "H:MM".`
      );
    }
  }
}

export { Emotion };
