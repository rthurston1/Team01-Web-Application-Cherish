import { CalendarComponent } from "./pages/calendar/CalendarComponent.js";
import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/journal/JournalComponent.js";
import { CheckInComponent } from "./pages/check-in/CheckInComponent.js";
import { SummaryComponent } from "./pages/summary/SummaryComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";
import { IDBService } from "./services/IDBService.js";

const hub = EventHub.getInstance();

// Initializes database then loads in Main Page
hub.subscribe(Events.InitDataSuccess, () => {
  console.log("Initialized database successfully");

  DATABASE.restoreDay(id)
    .then((data) => {
      hub.publish(Events.LoadMainPage, data);
      hub.publish(Events.LoadNav, data);
    })
    .catch(() => alert("Failed to restore day!"));
});

hub.subscribe(Events.InitDataFailed, () =>
  console.log("Failed to initialize database")
);

const today = new Date();

const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];

const id = dateArr.join("-");

export const DATABASE = new IDBService();
const calendar = new CalendarComponent(today);
const day = new DayComponent();
const journal = new JournalComponent();
const checkIn = new CheckInComponent();
const summary = new SummaryComponent();

// Retrieves data for the current day, on success passes data through an event

console.log("Everything loaded");

// hub.subscribe(Events.ClearedDataSuccess, () => console.log("Data cleared"));
// hub.subscribe(Events.ClearedDataFailed, () => console.log("Failed to clear data"));
// DATABASE.clearDatabase().then()
