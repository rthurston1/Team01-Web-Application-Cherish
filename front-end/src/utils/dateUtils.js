// Returns the current date as a string in the format "MM-DD-YYYY"
function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate());
  const year = today.getFullYear();
  return `${month}-${day}-${year}`;
}

// Converts a Date object to a string in the format "MM-DD-YYYY"
function convertDateToID(date) {
  if (!date instanceof Date) {
    throw new Error("Invalid date format. Please use a Date object.");
  }
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

// Returns the day of the week as a word (e.g. "Monday", "Tuesday", etc.)
// `date` can either be a date object or a string in the format "MM-DD-YYYY"
function getDayOfWeekWord(date = new Date()) {
  let dayOfWeek = "";

  if (date instanceof Date) {
    dayOfWeek = date.getDay();
  } else if (typeof date === "string") {
    // test pattern for "MM-DD-YYYY"
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(date)) {
      throw new Error(
        "Invalid date format. Please use MM-DD-YYYY or a date object."
      );
    }
    const dateParts = date.split("-");
    dayOfWeek = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[0]) - 1,
      parseInt(dateParts[1])
    ).getDay();
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayOfWeek];
}

export { getToday, convertDateToID, getDayOfWeekWord };
