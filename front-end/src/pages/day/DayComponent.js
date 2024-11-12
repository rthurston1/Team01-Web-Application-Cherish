import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { MONTHS } from "../calendar/CalendarComponent.js";
import { getEmotionById } from "../check-in/CheckInComponent.js";

// Converts date id into a readable Date (ex. 11-10-2024 => November 10, 2024)
export function dateFormat(dataId) {
  if (!dataId) {
    return;
  }
  const arr = dataId.split("-");
  return `${MONTHS[parseInt(arr[0], 10) - 1]} ${arr[1]}, ${arr[2]}`;
}

export class DayComponent extends BaseComponent {
  constructor() {
    super("dayPage", "./pages/day/stylesDay.css");
    this.dateData = {};
  }

  // Methods

  #goToMainPage() {
    EventHub.getInstance().publish(Events.LoadMainPage, this.dateData);
  }

  // Calls an event to load journal page
  #goToJournalPage() {
    EventHub.getInstance().publish(Events.LoadJournalPage, this.dateData);
  }

  // Calls an event to load check-in page
  #goToCheckInPage() {
    EventHub.getInstance().publish(Events.LoadCheckInPage, this.dateData);
  }

  #addJournalEntry(journal) {
    this.dateData["journal_entry"] = journal;
    EventHub.getInstance().publish(Events.UpdateDatabase, this.dateData);
  }

  // Appends new emotion entry to Emotion Log
  #addEmotionEntry(emotion_entry) {
    if (!this.dateData["emotions"]) this.dateData["emotions"] = [];
    this.dateData.emotions.push(emotion_entry);
    this.#calculateRating();
    alert("emotion added!");
  }

  // Removes the specified emotion element from the Emotion Log
  #removeEmotionEntry(emotion_entry) {
    document.getElementById("dayEmotionLog").innerHTML = "";

    const filteredArr = this.dateData.emotions.filter(
      (e) => e !== emotion_entry
    );
    this.dateData.emotions = filteredArr;

    this.#calculateRating();
    this.#renderEmotions();
    alert("emotion deleted!");
  }

  // Calculates Daily Ranking based on emotions logged also saves any changed to database
  #calculateRating() {
    EventHub.getInstance().publish(Events.UpdateDatabase, this.dateData);
  }

  #renderEmotions() {
    const emotionLog = document.getElementById("dayEmotionLog");
    if (!this.dateData.emotions) {
      emotionLog.textContent = "NO EMOTIONS LOGGED";
      return;
    }

    this.dateData.emotions.forEach((emotion) => {
      const emotionEntry = document.createElement("div");
      emotionEntry.classList.add("day-log-entry");
      emotionLog.appendChild(emotionEntry);

      const entryInfo = document.createElement("div");
      emotionEntry.appendChild(entryInfo);

      const emotionName = document.createElement("label");
      emotionName.textContent = getEmotionById(emotion.emotion_id);

      const emotionMag = document.createElement("label");
      emotionMag.textContent = emotion.magnitude;

      const timestamp = document.createElement("label");
      timestamp.textContent = emotion.timestamp;

      entryInfo.appendChild(emotionName);
      entryInfo.appendChild(emotionMag);
      entryInfo.appendChild(timestamp);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      deleteButton.addEventListener("click", () =>
        this.#removeEmotionEntry(emotion)
      );

      emotionEntry.appendChild(deleteButton);
    });
  }

  // Inherited Methods from BaseComponent
  _buildHTML() {
    return `
            <div class="day-container">
                <div class="day-head-element">
                    <h1>Day Page<h1>
                    <h2 id="dayDate">Hello</h2>
                </div>
                
                <div class="day-body-element" id="dayContent">
                    <div class="day-emotion-container" id="dayEmotionLog"></div>

                    <div class="day-journal-container">
                        <textarea id="dayJournalEntry" placeholder="No journal entry" readonly></textarea>

                        <div id="dayButtons">
                            <button id="dayToMain">Main Page</button>
                            <button id="dayToJournal">Journal</button>
                            <button id="dayToCheckIn">Check-In</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  _addEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.LoadDayPage, (data) => this.loadPage(data));
    hub.subscribe(Events.SummarySubmitted, (journal) =>
      this.#addJournalEntry(journal)
    );
    hub.subscribe(Events.CheckInSubmitted, (emotion) =>
      this.#addEmotionEntry(emotion)
    );

    document
      .getElementById("dayToMain")
      .addEventListener("click", () => this.#goToMainPage());
    document
      .getElementById("dayToJournal")
      .addEventListener("click", () => this.#goToJournalPage());
    document
      .getElementById("dayToCheckIn")
      .addEventListener("click", () => this.#goToCheckInPage());
  }

  // Changes view to Day Page
  _render(data) {
    if (data) this.dateData = data;

    document.getElementById("dayDate").textContent = dateFormat(
      this.dateData.date_id
    );
    document.getElementById("dayJournalEntry").textContent =
      this.dateData.journal;

    // Added Emotions to Log
    this.#renderEmotions();
  }
}
