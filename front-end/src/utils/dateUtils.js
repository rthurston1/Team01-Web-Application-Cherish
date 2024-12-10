// Returns the current date as a string in the format "YYYY-MM-DD"
function getToday(format = "YYYY-MM-DD") {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    default:
      throw new Error(
        "Invalid date format. Please use MM-DD-YYYY or YYYY-MM-DD."
      );
  }
}

function isISO(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isMMDDYY(date) {
  return /^\d{2}-\d{2}-\d{4}$/.test(date);
}

// Convert MM-DD-YYYY to YYYY-MM-DD
// Author: @rthurston1
const convertDateToISO = (date) => {
  // assert date is in MM-DD-YYYY format first
  if (!isMMDDYY(date)) {
    throw new Error(
      "Invalid date format provided to convertDateToISO. Please use MM-DD-YYYY."
    );
  }
  const [month, day, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

// Convert YYYY-MM-DD to MM-DD-YYYY
// Author: @rthurston1
const convertISOToDate = (iso) => {
  // assert date is in YYYY-MM-DD format first
  if (!isISO(iso)) {
    throw new Error(
      "Invalid date format provided to convertISOToDate. Please use YYYY-MM-DD."
    );
  }
  const [year, month, day] = iso.split("-");
  return `${month}-${day}-${year}`;
};

// Converts a Date object to a string in the format "YYYY-MM-DD"
function convertDateToID(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date format. Please use a Date object.");
  }
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
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

export {
  getToday,
  convertDateToID,
  getDayOfWeekWord,
  convertDateToISO,
  convertISOToDate,
  isISO,
  isMMDDYY,
};
