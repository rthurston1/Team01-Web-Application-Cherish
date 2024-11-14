/**
 * An object containing various message types for task management.
 */
export const Events = {
  LoadNav: "LoadNav", // Loads the navigation bar
  LoadMainPage: "LoadMainPage", // Loads the main page (First thing called when application starts up)
  LoadDayPage: "LoadDayPage", // Loads the Day Component with content corresponding to the calendar day
  LoadJournalPage: "LoadJournalPage", // Loads Journal Page, content based on current Day Page
  LoadCheckInPage: "LoadCheckInPage", // Loads Check-in Page
  LoadSummaryPage: "LoadSummaryPage", // Loads Summary Page, context based on all data stored

  StoreData: "StoreData", // Async call to store any changes inputted by user
  ClearData: "ClearData", // Async call to clear all data stored in database
  RestoreData: "RestoreDatabase", // Async call to restore/retrieve data

  InitDataSuccess: "InitDatabaseSuccess", // Successful database init call
  StoredDataSuccess: "StoredDataSuccessfully", // Successful database store call
  RestoredDataSuccess: "RestoredDataSuccessfully", // Successful database restore call
  ClearedDataSuccess: "ClearedDataSuccess", // Successful database clear call

  InitDataFailed: "InitDatabaseFailed", // Failed database init call
  StoredDataFailed: "StoredDataSuccessfully", // Failed database store call
  RestoredDataFailed: "RestoredDataSuccessfully", // Failed database restore call
  ClearedDataFailed: "ClearedDataFailed", // Failed database clear call
  
};
