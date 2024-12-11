### Sequence Diagram: When user clicks on previous / next navigation menu

The sequence diagram illustrates the workflow for updating the calendar view when a user clicks the "Previous" or "Next" button. Here's what happens:

- **User Interaction**: The user clicks the navigation buttons ("Previous" or "Next") in the calendar interface. Our buttons are designed in a way as HTML DOM elements so 
that it is easier to mention them within the calendar component file.

- **Calendar Update**: The CalendarComponent updates its internal date object to reflect the new month.


- **Re-render Trigger**: The component invokes the render() method to refresh the calendar display.

- **Clear Old Days**: The render() method clears the existing days from the calendar grid.

- **Generate New Days**: The render() method generates the days for the updated month, including overflow days for the previous and next months.

- **Callback Execution**: The updated calendar view is displayed to the user, completing the interaction.

This flow ensures the calendar dynamically updates its display based on user navigation inputs.
