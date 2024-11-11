import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";

/**
 * Navigates to the specified page.
 * @param {*} page The page to navigate to. Options are "check-in", "journal",
 * "stats", "summary", and "calendar".
 */

function goToPage(page) {
  const hub = EventHub.getInstance();
  switch (page) {
    case "check-in":
      console.log("Check-in page will be here one day.");
      // hub.publish(Events.LoadCheckInPage, this.dateData);
      break;
    case "journal":
      hub.publish(Events.LoadJournalPage, date);
      break;
    case "stats":
      console.log("Stats page will be here one day.");
      // hub.publish(Events.LoadStatsPage, this.dateData);
      break;
    case "summary":
      console.log("Summary page will be here one day.");
      // hub.publish(Events.LoadSummaryPage, this.dateData);
      break;
    case "calendar":
      hub.publish(Events.LoadMainPage, date);
      break;
    default:
      console.log("Invalid page selection.");
      break;
  }
}

function buildHTML() {
  return `
            <button class="feature-button calendar-page" id="main_toCalendarPage">Calendar</button>
            <button class="feature-button check-in" id="main_toCheckInPage">Check-in</button>
            <button class="feature-button journal" id="main_toJournalPage">Journal</button>
            <button class="feature-button stats" id="main_toStatsPage">Stats</button>
            <button class="feature-button summary" id="main_toSummaryPage">Summary</button>
    `;
}

function addEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("main_toCalendarPage")
      .addEventListener("click", () => goToPage("calendar"));
    document
      .getElementById("main_toJournalPage")
      .addEventListener("click", () => goToPage("journal"));
    document
      .getElementById("main_toCheckInPage")
      .addEventListener("click", () => goToPage("check-in"));
    document
      .getElementById("main_toStatsPage")
      .addEventListener("click", () => goToPage("stats"));
    document
      .getElementById("main_toSummaryPage")
      .addEventListener("click", () => goToPage("summary"));
  });
}

function render() {
  document.getElementsByClassName("nav")[0].innerHTML = buildHTML();
  addEventListeners();
}

render();
