import { BaseComponent } from "../BaseComponent.js";
import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";

const hub = EventHub.getInstance();

hub.subscribe(Events.LoadNav, (data) => {
  /**
   * Navigates to the specified page.
   * @param {*} page The page to navigate to. Options are "check-in", "journal",
   * "stats", "summary", and "calendar".
   */

  function goToPage(page) {
    switch (page) {
      case "check-in":
        hub.publish(Events.LoadCheckInPage, data);
        break;
      case "journal":
        hub.publish(Events.LoadJournalPage, data);
        break;
      case "today":
        hub.publish(Events.LoadDayPage, data);
        break;
      case "summary":
        hub.publish(Events.LoadSummaryPage, data);
        break;
      case "calendar":
        hub.publish(Events.LoadMainPage, data);
        break;
      default:
        hub.publish(Events.LoadMainPage, data);
        break;
    }
  }

  function buildHTML() {
    return `
              <button class="nav-btns" id="toCalendarPage">Calendar</button>
              <button class="nav-btns" id="toCheckInPage">Check-in</button>
              <button class="nav-btns" id="toDayPage">Today</button>
              <button class="nav-btns" id="toJournalPage">Journal</button>
              <button class="nav-btns" id="toSummaryPage">Summary</button>
      `;
  }

  function addEventListeners() {
    document
      .getElementById("toCalendarPage")
      .addEventListener("click", () => goToPage("calendar"));
    document
      .getElementById("toJournalPage")
      .addEventListener("click", () => goToPage("journal"));
    document
      .getElementById("toCheckInPage")
      .addEventListener("click", () => goToPage("check-in"));
    document
      .getElementById("toDayPage")
      .addEventListener("click", () => goToPage("today"));
    document
      .getElementById("toSummaryPage")
      .addEventListener("click", () => goToPage("summary"));
  }

  function render() {
    document.getElementsByClassName("nav")[0].innerHTML = buildHTML();
    addEventListeners();
  }

  render();
});
