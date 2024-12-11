User: The person interacting with the tabs on the webpage.
SummaryComponent: The main class handling the logic for rendering, updating, and managing the summary page.
EventHub: A singleton event handler that manages event subscriptions and publications.
DOM: The Document Object Model where HTML elements are updated.
User Interaction:

The User clicks on a tab (e.g., Day, Week, Month, Year).
SummaryComponent Processes Interaction:

The SummaryComponent detects the click event and calls the handleClick() function.
Inside handleClick():
It removes the active-tab class from all tabs.
Applies the active-tab class to the clicked tab, visually indicating selection.
Updates the summary-text element with a description corresponding to the selected tab.
EventHub Subscription:

The SummaryComponent has already subscribed to the Events.LoadSummaryPage event during its initialization.
When the page needs to load summary data (e.g., upon tab selection), it relies on the EventHub to publish the LoadSummaryPage event.
EventHub Publishes Event:

The EventHub processes the LoadSummaryPage event and sends data (e.g., day rating and current date) back to the SummaryComponent.
DOM Updates:

Upon receiving data from the EventHub, the SummaryComponent:
Updates the day-rating span with the rating value or "N/A" if unavailable.
Updates the current-day span with the date or "N/A" if unavailable.
Feedback to User:

The User sees:
The selected tab highlighted visually (green background for active tab).
The updated summary text corresponding to the selected period.
Updated stats (day-rating and current-day) in the stats section.
Flow Summary
The User initiates the interaction.
The SummaryComponent handles UI updates and event subscriptions.
The EventHub manages data flow between the SummaryComponent and other parts of the application.
The DOM reflects all updates, ensuring the user sees the latest information.
