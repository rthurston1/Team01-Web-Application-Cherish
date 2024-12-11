import { CalendarComponent } from "./pages/calendar/CalendarComponent.js";
import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/journal/JournalComponent.js";
import { CheckInComponent } from "./pages/check-in/CheckInComponent.js";
import { SummaryComponent } from "./pages/summary/SummaryComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";
import { IDBService } from "./services/IDBService.js";
import { LoginComponent } from "./pages/log-in/LoginComponent.js";

let globalUser = null; //once login is successful, save the username to be imported to other classes as needed

const hub = EventHub.getInstance();
const header = document.querySelector(".page-header");
const nav = document.querySelector(".nav");

// Initially hide header and nav
header.style.display = "none";
nav.style.display = "none";


// Subscribe to LoadLoginPage to render the login page
hub.subscribe(Events.LoadLoginPage, () => {
  const login = new LoginComponent();
  login.loadPage();
});

// Publish event to load the login page
hub.publish(Events.LoadLoginPage, {});

// Subscribe to LoginSuccess to load the main application
hub.subscribe(Events.LoginSuccess, (data) => {
  globalUser = data.username;
  console.log(`User logged in: ${data.username}`);

// Show header and navigation bar after login
header.style.display = "block";
nav.style.display = "flex";

// Initialize and render the calendar page by default
const calendar = new CalendarComponent(new Date());
calendar.loadPage();

// Publish the event to load the navigation bar
hub.publish(Events.LoadNav, {});

  // Initialize other components after login
  const day = new DayComponent();
  const journal = new JournalComponent();
  const checkIn = new CheckInComponent();
  const summary = new SummaryComponent();

});
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

hub.subscribe(Events.InitDataFailed, () => {
  console.log("Failed to initialize database")
});

export const DATABASE = new IDBService();
const today = new Date();

const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];

const id = dateArr.join("-");
// Retrieves data for the current day, on success passes data through an event

console.log("Login page loaded and waiting for user interaction.");

const getUsername = () => globalUser; 
export { getUsername }; 

// hub.subscribe(Events.ClearedDataSuccess, () => console.log("Data cleared"));
// hub.subscribe(Events.ClearedDataFailed, () => console.log("Failed to clear data"));
// DATABASE.clearDatabase().then()
