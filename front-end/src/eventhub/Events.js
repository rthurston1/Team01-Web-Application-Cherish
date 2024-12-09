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

  //Authentication Events
  LoadLoginPage: "LoadLoginPage",
  LoginSuccess: "LoginSuccess",
  LoginFailed: "LoginFailed", // Failed login event (if needed in the future)

  StoreData: "StoreData", // Async call to store any changes inputted by user
  ClearData: "ClearData", // Async call to clear all data stored in database
  RestoreData: "RestoreData", // Async call to restore/retrieve data

  InitDataSuccess: "InitDataSuccess", // Successful database init call
  StoredDataSuccess: "StoredDataSuccess", // Successful database store call
  RestoredDataSuccess: "RestoredDataSuccess", // Successful database restore call
  ClearedDataSuccess: "ClearedDataSuccess", // Successful database clear call

  InitDataFailed: "InitDataFailed", // Failed database init call
  StoredDataFailed: "StoredDataFailed", // Failed database store call
  RestoredDataFailed: "RestoredDataFailed", // Failed database restore call
  ClearedDataFailed: "ClearedDataFailed", // Failed database clear call

  StoreEmotion: "StoreEmotion", // Async call to store an emotion entry
  RestoreEmotion: "RestoreEmotion", // Async call to restore/retrieve an emotion entry

  StoreEmotionSuccess: "StoreEmotionSuccess", // Successful emotion store call
  RestoreEmotionSuccess: "RestoreEmotionSuccess", // Successful emotion restore call

  StoreEmotionFailed: "StoreEmotionFailed", // Failed emotion store call
  RestoreEmotionFailed: "RestoreEmotionFailed", // Failed emotion restore call

  GenerateSummary: "GenerateSummary", // Async call to generate a summary of the user's data
  GenerateSummarySuccess: "GenerateSummarySuccess", // Successful summary generation call
  GenerateSummaryFailed: "GenerateSummaryFailed", // Failed summary generation call
};
