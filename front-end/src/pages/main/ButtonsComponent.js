export class ButtonsComponent extends BaseComponent {
  constructor() {
    super("buttons", "pages/main/stylesButtons.css");
  }

  #goToPage(page) {
    const hub = EventHub.getInstance();
    switch (page) {
      case "check-in":
        console.log("Check-in page will be here one day.");
        // hub.publish(Events.LoadCheckInPage, this.dateData);
        break;
      case "journal":
        hub.publish(Events.LoadJournalPage, null);
        break;
      case "stats":
        console.log("Stats page will be here one day.");
        // hub.publish(Events.LoadStatsPage, this.dateData);
        break;
      case "summary":
        console.log("Summary page will be here one day.");
        // hub.publish(Events.LoadSummaryPage, this.dateData);
        break;
      default:
        hub.publish(Events.LoadMainPage, null);
    }
  }

  _buildHTML() {
    return `
      <div class="feature-buttons">
            <button class="feature-button check-in" id="main_toCheckInPage">Check-in</button>
            <button class="feature-button journal" id="main_toJournalPage">Journal</button>
            <button class="feature-button stats" id="main_toStatsPage">Stats</button>
            <button class="feature-button summary" id="main_toSummaryPage">Summary</button>
          </div>
    `;
  }

  _addEventListeners() {
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
    this.bodyElement.innerHTML = this._buildHTML();
    this._addEventListeners();
  }
}
