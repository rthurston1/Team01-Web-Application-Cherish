import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";
import { JournalComponent } from "./journal/JournalComponent.js";

export class DayComponent extends BaseComponent {
  constructor() {
    super("dayPage", "./pages/day/stylesDay.css");
    this.dateData = {};
  }

  // Methods

  // Calls an event to load journal page
  #goToJournalPage() {
    const hub = EventHub.getInstance();
    hub.publish(Events.LoadJournalPage, this.dateData);
  }

  // Calls an event to load check-in page
  #goToCheckInPage() {
    // TODO: Implement this method
  }

  // Appends new emotion entry to Emotion Log
  #addEmotionEntry(emotion_entry) {
    // TODO: Implement this method
  }

  // Removes the specified emotion element from the Emotion Log
  #removeEmotionEntry(emotion_entry) {
    // TODO: Implement this method
  }

  // Inherited Methods from BaseComponent
  _buildHTML() {
    return `
            <h1 class="body-element" id="date"></h1>

            <div class="body-element" id="content">
                <div class="scroll-container" id="emotionLog"></div>

                <div class="journal-container" id="journalLog">

                    <div class"button-container" id="buttons">
                        <button id="toJournalPage">Journal</button>
                        <button id="toCheckInPage">Check-In</button>
                    </div>

                    <textarea id="journalEntry" placeholder="No journal entry" readonly></textarea>
                </div>

            </div>
        `;
  }

  _addEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.LoadDayPage, (data) => this._render(data));

    document
      .getElementById("toJournalPage")
      .addEventListener("click", () => this.#goToJournalPage());
    document
      .getElementById("toCheckInPage")
      .addEventListener("click", () => this.#goToCheckInPage());
  }

  // Changes view to Day Page
  _render(data) {
    document
      .querySelectorAll(".view")
      .forEach((body) => (body.style.display = "none"));

    this.dateData = data;
    document.getElementById("date").textContent = this.dateData.format;
    document.getElementById("journalEntry").textContent =
      this.dateData.journal_entry;

    // Displays View
    this._changeDisplay("flex");
  }
}
