/**
 * An object containing various message types for task management.
 */
export const Events = {
  LoadNav: "LoadNav", // Loads the navigation bar
  LoadMainPage: "LoadMainPage", // Loads the main page (First thing called when application starts up)
  LoadDayPage: "LoadDayPage", // Loads the Day Component with content corresponding to the calendar day
  LoadJournalPage: "LoadJournalPage", // Loads Journal Page, content based on current Day Page
  LoadCheckInPage: "LoadCheckInPage",
  LoadSummaryPage: "LoadSummaryPage",
  SummarySubmitted: "SummarySubmitted",
  CheckInSubmitted: "CheckInSubmitted",
  ChangedView: "ChangedView", // Whenever the view changes (useful for automatically saving submission)
  UpdateDatabase: "UpdateDatabase", // Async stores any submissions to database
};
