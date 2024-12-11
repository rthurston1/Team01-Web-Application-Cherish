import { Day } from "../../../../front-end/src/utils/Day.js";
import { Emotion } from "../../../../front-end/src/utils/Emotion.js";

// a valid id is a string in the format YYYY-MM-DD
function isValidDateID(date_id) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(date_id);
}

function isValidRating(rating) {
  return !isNaN(rating) && rating >= 1 && rating <= 10;
}

// Helper function to verify Day object
function isValidDay(data) {
  if (data instanceof Day) return true;
  return (
    typeof data.date_id === "string" &&
    Array.isArray(data.emotions) &&
    typeof data.rating === "number" &&
    typeof data.journal === "string" &&
    isValidDateID(data.date_id) &&
    isValidRating(data.rating) &&
    data.journal.length <= 2000
  );
}

// Helper function to verify Emotion object
function isValidEmotion(data) {
  if (data instanceof Emotion) return true;
  return (
    typeof data.date_id === "string" &&
    typeof data.emotion_id === "string" &&
    typeof data.magnitude === "number" &&
    typeof data.description === "string" &&
    typeof data.timestamp === "string" &&
    isValidDateID(data.date_id) &&
    isValidRating(data.magnitude) &&
    data.description.length <= 250
  );
}

export { isValidDay, isValidEmotion };
