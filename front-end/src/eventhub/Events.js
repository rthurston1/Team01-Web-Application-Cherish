/**
 * An object containing various message types for task management.
 */
export const Events = {
  LoadMainPage: 'LoadMainPage', // Loads the main page (First thing called when application starts up)
  LoadDayPage: 'LoadDayPage', // Loads the Day Component with content corresponding to the calendar day 
  LoadJournalPage: 'LoadJournalPage', // Loads Journal Page, content based on current Day Page
  LoadCheckInPage: 'LoadCheckInPage',
  LoadSummaryPage: 'LoadSummaryPage',
};
