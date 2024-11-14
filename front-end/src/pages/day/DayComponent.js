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
      emotionLog.textContent = "NO EMOTIONS LOGGED";
      return;
    }

    this.dateData.emotions.forEach((emotion) => {
      const emotionEntry = document.createElement("div");
      emotionEntry.classList.add("day-log-entry");
      this.emotionLog.appendChild(emotionEntry);

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
      deleteButton.addEventListener("click", () => this.#removeEmotionEntry(emotion));

      emotionEntry.appendChild(deleteButton);
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
                    <div class="day-body-element" id="dayEmotionLog">
                      <div class="day-emotion-entry">
                        <section>
                          <ul>
                            <li>HH:MM</li>
                            <li>Rating: 10</li>
                            <li>
                              Description: I hate Comp 250 still, 
                              even though I'm not taking it right now.
                              I NEVER want to see that class ever again.
                              I don't want to think about it, it makes me
                              too mad. It's insane that they expect you 
                              to learn that much in such a short amount of time.
                            </li>
                          </ul>  
                        </section>
                        
                        <figure>
                          <img src="img/smile.gif" alt="image">
                        </figure>
                        
                      </div>
                      <div class="day-emotion-entry">
                        <section>
                          <ul>
                            <li>HH:MM</li>
                            <li>Rating: 10</li>
                            <li>
                              Description: I hate Comp 250 still, 
                              even though I'm not taking it right now.
                              I NEVER want to see that class ever again.
                              I don't want to think about it, it makes me
                              too mad. It's insane that they expect you 
                              to learn that much in such a short amount of time.
                            </li>
                          </ul>  
                        </section>
                        
                        <figure>
                          <img src="img/smile.gif" alt="image">
                        </figure>
                        
                      </div>
                      <div class="day-emotion-entry">
                        <section>
                          <ul>
                            <li>Time: HH:MM</li>
                            <li>Rating: 10</li>
                            <li>
                              Description: I hate Comp 250 still, 
                              even though I'm not taking it right now.
                              I NEVER want to see that class ever again.
                              I don't want to think about it, it makes me
                              too mad. It's insane that they expect you 
                              to learn that much in such a short amount of time.
                            </li>
                          </ul>  
                        </section>
                        
                        <figure>
                          <img src="img/smile.gif" alt="image">
                        </figure>
                        
                      </div>
                    </div>
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

    // Mock Summary
    const daySummary = `My day was productive! I tackled some ongoing projects and made solid progress, especially on my web app. I worked on centering elements within a container class, trying to get everything aligned just right on the page, which took a bit of trial and error. I also reviewed some concepts related to IndexedDB, focusing on setting date_id as the key path in my object store, which will be useful for handling data accurately`;
    this.dateData['journal'] = daySummary

    this.titleDate.textContent = dateFormat(this.dateData.date_id);
    this.journalEntry.textContent = this.dateData.journal;

    // Added Emotions to Log
    // this.#renderEmotions();
  }
}

