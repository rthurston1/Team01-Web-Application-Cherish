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
    // Use event delegation to handle button clicks
    // and navigate to the appropriate page using the text content of the button
    document.getElementsByClassName("nav")[0].addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-btns")) {
        // Remove the active class from all buttons
        document.querySelectorAll(".nav-btns").forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");
        goToPage(e.target.textContent.toLowerCase());
      }
    });
  }

  function render() {
    // Render the navigation bar
    document.getElementsByClassName("nav")[0].innerHTML = buildHTML();
    addEventListeners();
  }

  render();
});
