import { CalendarComponent } from "./pages/calendar/CalendarComponent.js";
import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/journal/JournalComponent.js";
import { CheckInComponent } from "./pages/check-in/CheckInComponent.js";
import { NavigationComponent } from "./nav/NavigationComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";

new NavigationComponent();
new CalendarComponent();
new DayComponent();
new JournalComponent();
new CheckInComponent();

console.log("Everything loaded");

const today = new Date();
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];

const date = {
  date_id: dateArr.join("-"), // ID to pass as key to localStorage ex: 10-29-2024
};

EventHub.getInstance().publish(Events.LoadMainPage, date);
EventHub.getInstance().publish(Events.LoadNav, date);
