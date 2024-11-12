import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent.js";

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
        hub.publish(Events.LoadCheckInPage, this.dateData);
        break;
      case "journal":
        hub.publish(Events.LoadJournalPage, this.dateData);
        break;
      case "stats":
        hub.publish(Events.LoadStatsPage, this.dateData);
        break;
      case "summary":
        hub.publish(Events.LoadSummaryPage, this.dateData);
        break;
      case "calendar":
        hub.publish(Events.LoadMainPage, this.dateData);
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
    hub.subscribe(Events.LoadNav, (data) => this._render(data));
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

  _render(data) {
    this.dateData = data;
  }
}
