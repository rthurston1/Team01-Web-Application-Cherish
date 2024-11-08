import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/day/journal/JournalComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";

import { CalendarComponent } from "./pages/calendar/CalendarComponent.js";

new CalendarComponent();
new DayComponent();
new JournalComponent();
console.log("Everything loaded");

const today = new Date();
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];

const date = {
  month: dateArr[0], // ex: 10 (October)
  day: dateArr[1], // ex: 29
  year: dateArr[2], // ex: 2024
  format: dateArr.join("/"), // Displays in header ex: 10/29/2024
  id: dateArr.join("-"), // ID to pass as key to localStorage ex: 10-29-2024
};

EventHub.getInstance().publish(Events.LoadMainPage, date);
