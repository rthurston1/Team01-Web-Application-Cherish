import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { MONTHS } from "../calendar/CalendarComponent.js";

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
  // Removes the specified emotion element from the Emotion Log
  #removeEmotionEntry(emotion_entry) {
    const filteredArr = this.dateData.emotions.filter((e) => e !== emotion_entry);
    this.dateData.emotions = filteredArr;

    this.#calculateRating();
    this.#renderEmotions();
    alert("emotion deleted!");
  }

  // Calculates Daily Ranking based on emotions logged also saves any changed to database
  #calculateRating() {
    this.update(Events.UpdateDatabase, this.dateData);
  }

  #renderEmotions() {
    this.emotionLog.innerHTML = "" // Clears html 
    if (!this.dateData.emotions) {
      this.emotionLog.textContent = "NO EMOTIONS LOGGED";
      return;
    }

    this.dateData.emotions.forEach((emotion) => {
      const emotionEntry = document.createElement("div");
      emotionEntry.classList.add('day-emotion-entry');

      emotionEntry.innerHTML = `
        <section>
          <ul>
            <li id="emotionEntryTime"></li>
            <li id="emotionEntryRating"></li>
            <li id="emotionEntryDescription"></li>
          </ul>  
        </section>
        
        <figure>
          <img id="emotionEntryImage">
        </figure>
      `;

      // Adds to emotion log
      this.emotionLog.appendChild(emotionEntry);

      // Gets Elements
      const time = document.getElementById("emotionEntryTime");
      const rating = document.getElementById("emotionEntryRating");
      const description = document.getElementById("emotionEntryDescription");
      const image = document.getElementById("emotionEntryImage");
    
      // Set Data
      time.textContent = emotion.timestamp;
      rating.textContent = emotion.magnitude;
      description.textContent = emotion.description;

      image.src = `img/${emotion.emotion_id}.gif`
      image.alt = emotion.emotion_id;

      // Remove ids (Allows next entry to use ids)
      time.removeAttribute("id");
      rating.removeAttribute("id");
      description.removeAttribute("id");
      image.removeAttribute("id");

      // Will need set src


  
      // TODO: ADD DELETE BUTTON
    });
  }

  // Inherited Methods from BaseComponent
  _buildHTML() {
    return `
            <div class="day-container">
                <div class="day-head-container">
                    <h1>Day Page</h1>
                    <h2 id="dayDate">Hello</h2>
                </div>
                
                <div class="day-body-container">
                    <div class="day-body-element" id="dayEmotionLog"></div>
                    <textarea class="day-body-element" id="dayJournalEntry" placeholder="No journal entry" readonly></textarea>
                </div>
            </div>
        `;
  }

  _createElementObjs() {
     // Elements
     this.titleDate = document.getElementById("dayDate");
     this.journalEntry =  document.getElementById("dayJournalEntry");
     this.emotionLog = document.getElementById("dayEmotionLog");
  }

  _addEventListeners() {
    this.addEvent(Events.LoadDayPage, (data) => this.loadPage(data));
  }

  // Changes view to Day Page
  _render(data) {
    if (data) this.dateData = data;

    this.dateData['journal'] = this.dateData['journal'] 
    ? this.dateData.journal
    : "";

    this.titleDate.textContent = dateFormat(this.dateData.date_id);
    this.journalEntry.textContent = this.dateData.journal;

    // Added Emotions to Log
    this.#renderEmotions();
  }
}

