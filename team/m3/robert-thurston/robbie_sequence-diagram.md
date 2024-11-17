### Sequence Diagram: When user clicks on a date on the main page calendar

The sequence diagram illustrates the workflow for loading and displaying the emotions and details of a selected day in the day view. Here's what happens:

- **User Interaction**: The user clicks on a date displayed within the calendar. Each date is represented as an HTML DOM element with a `day` class and a `data-date` attribute.

- **Calendar Component**:
  - The event listener in the `CalendarComponent` detects the click event and retrieves the `data-date` value of the clicked element.
  - It invokes the `DATABASE.restoreDay(date)` method, passing the selected date to load the corresponding day's data.

- **Database Interaction**:
  - The `DatabaseService` fetches the day's data from the IndexedDB and resolves it back to the `CalendarComponent`.

- **Event Broadcast**:
  - The `CalendarComponent` publishes an event (`Events.LoadDayPage`) via the `EventHub`, passing the fetched data.

- **Day Component Update**:
  - The `DayComponent` listens for the `Events.LoadDayPage` event.
  - Upon receiving the event, it calls its internal `_render(data)` method, passing the data for the selected day.

- **Day View Render**:
  - The `_render(data)` method processes the day's data:
    - Updates the displayed date and journal entry.
    - Invokes the `#renderEmotions()` method to dynamically create and display emotion entries stored in the day's data.
    - Calls `#calculateRating()` to compute and display the day's rating.
  - The emotions log is cleared, and each emotion in the data is displayed with details such as time, rating, description, and an associated image.

This flow ensures that the day view dynamically updates with the emotions, journal entry, and rating for the selected date, providing a seamless user experience.
