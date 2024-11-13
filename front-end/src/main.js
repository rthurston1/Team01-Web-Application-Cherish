import { CalendarComponent } from "./pages/calendar/CalendarComponent.js";
import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/journal/JournalComponent.js";
import { CheckInComponent } from "./pages/check-in/CheckInComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";
import { DatabaseService } from "./services/DatabaseService.js";

const hub = EventHub.getInstance();
const today = new Date();
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
const id = dateArr.join('-');

const database = new DatabaseService();
const calendar = new CalendarComponent(today);
const day = new DayComponent();
const journal = new JournalComponent();
const checkIn = new CheckInComponent();

let gotData = false;

// ONLY WORKS ON START-UP
hub.subscribe(Events.RestoredDataSuccess, (data) => {
  if (gotData) return;

  gotData = true;
  hub.publish(Events.LoadMainPage, data);
})

// Retrieves data for the current day, on success passes data through an event
database.restoreDay(id);
console.log("Everything loaded");
