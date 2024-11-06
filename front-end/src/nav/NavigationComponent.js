import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";
import { BaseComponent } from "../pages/main/BaseComponent.js";

/**
 * Temporary date object to pass to other pages. Will be replaced with a more
 * dynamic solution in the future.
 */
const today = new Date();
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
const date = {
  month: dateArr[0], // ex: 10 (October)
  day: dateArr[1], // ex: 29
  year: dateArr[2], // ex: 2024
  format: dateArr.join("/"), // Displays in header ex: 10/29/2024
  id: dateArr.join("-"), // ID to pass as key to localStorage ex: 10-29-2024
};

export class NavigationComponent extends BaseComponent {
  constructor() {
    super("nav", "./nav/stylesNav.css", true);
  }

  /**
   * Navigates to the specified page.
   * @param {*} page The page to navigate to. Options are "check-in", "journal",
   * "stats", "summary", and "calendar".
   */
  #goToPage(page) {
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

  _buildHTML() {
    return `
            <button class="feature-button calendar-page" id="main_toCalendarPage">Calendar</button>
            <button class="feature-button check-in" id="main_toCheckInPage">Check-in</button>
            <button class="feature-button journal" id="main_toJournalPage">Journal</button>
            <button class="feature-button stats" id="main_toStatsPage">Stats</button>
            <button class="feature-button summary" id="main_toSummaryPage">Summary</button>
    `;
  }

  _addEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.LoadNav, () => this._render());
    document
      .getElementById("main_toCalendarPage")
      .addEventListener("click", () => this.#goToPage("calendar"));
    document
      .getElementById("main_toJournalPage")
      .addEventListener("click", () => this.#goToPage("journal"));
    document
      .getElementById("main_toCheckInPage")
      .addEventListener("click", () => this.#goToPage("check-in"));
    document
      .getElementById("main_toStatsPage")
      .addEventListener("click", () => this.#goToPage("stats"));
    document
      .getElementById("main_toSummaryPage")
      .addEventListener("click", () => this.#goToPage("summary"));
  }

  _render() {
    document.getElementById("nav").innerHTML = this._buildHTML();
    this._addEventListeners();
    this._changeDisplay("flex");
  }
}
