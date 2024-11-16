import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { MONTHS } from "../calendar/CalendarComponent.js";
import { EMOTIONS } from "../check-in/CheckInComponent.js";

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
  #deleteEmotion(emotion_entry) {
    const filteredArr = this.dateData.emotions.filter((e) => e !== emotion_entry);
    this.dateData.emotions = filteredArr;

    this.#calculateRating();
    this.update(Events.StoreData, this.dateData);

    alert("Emotion deleted!");
    this._render(this.dateData);
  }

  // Calculates Daily Ranking based on emotions logged also saves any changed to database
  #calculateRating() {
    // Each emoji will have a baseline value from -4 to 2 
    // To get the check-in numeric rating, we will multiply baseline emoji value by magnitude of emotion value 
    // e.g. highest possible rating is happy with 10 magnitude (2 * 10 = 20), lowest possible rating is Disgusted with 10 magnitude (-4 * 10 = -40)
    // Then we normalize the final rating to fit within the 1 to 10 range
    if (!this.dateData["emotions"] || this.dateData.emotions.length === 0) {
      this.dateData["rating"] = 0;
      return;
    }
    
    let sumRate = 0, count = 0, dailyRating = 0; 
    const emotionsArr = this.dateData.emotions;
    emotionsArr.forEach((emotionObj) => {
      let base = 0; 
      const magnitude = emotionObj.magnitude;
      switch (emotionObj.emotion_id) {
        case "Happy":
          base = 2;
          break;
        case "Neutral":
          base = 0; 
          break; 
        case "Anxious":
          base = -1;
          break;
        case "Sad":
          base = -2;
          break; 
        case "Angry":
          base = -3; 
          break; 
        case "Disgusted":
          base = -4; 
          break; 
        default:
          base = 0; 
          break; 
      }

      const rate = base * magnitude; //the rating for a single check-in 
      sumRate += rate; //add each check-in rating to an accumulating totalRating value
      count++;  
    });

    //normalize the final rating to fit within the 1 to 10 range
    const maxPossibleRating = 2 * 10; //highest possible rating (Happy with magnitude 10)
    const minPossibleRating = -4 * 10; //lowest possible rating (Disgusted with magnitude 10)
    const normalizedRating = ((sumRate / count - minPossibleRating) / (maxPossibleRating - minPossibleRating)) * 9 + 1;
    dailyRating = parseFloat(normalizedRating.toFixed(2)); //rounds rating to two decimal points
    

    this.dateData["rating"] = dailyRating; // Store the daily rating in dateData object
    this.update(Events.StoreData, this.dateData);
}

  #renderEmotions() {
    this.emotionLog.innerHTML = "" // Clears html 
    if (!this.dateData["emotions"] || this.dateData.emotions.length === 0) {
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
        <button id="delete" type="button">Delete</button>
      `;

      // Adds to emotion log
      this.emotionLog.appendChild(emotionEntry);

      // Gets Elements
      const time = document.getElementById("emotionEntryTime");
      const rating = document.getElementById("emotionEntryRating");
      const description = document.getElementById("emotionEntryDescription");
      const image = document.getElementById("emotionEntryImage");
      const deleteButton = document.getElementById("delete");
    
      // Set Data
      time.textContent = "Time: " + emotion.timestamp;
      rating.textContent = "Rating: " + emotion.magnitude;
      description.textContent = "Description: " + emotion.description;

      image.src = `img/${emotion.emotion_id}.gif`
      image.alt = emotion.emotion_id;

      deleteButton.addEventListener("click", () => this.#deleteEmotion(emotion));

      // Remove ids (Allows next entry to use ids)
      time.removeAttribute("id");
      rating.removeAttribute("id");
      description.removeAttribute("id");
      image.removeAttribute("id");
      deleteButton.removeAttribute("id");

      // Will need set src


  
      // TODO: ADD DELETE BUTTON
    });
  }

  // Inherited Methods from BaseComponent
  _buildHTML() {
    return `
      <div class="container">
        <h1 class="page-name-header" id="dayHeader">Your Day</h1>
        <div class="date-header" id="dayDate"></div>
        <h2>Your day so far:</h2>
        <div class="day-body-container">
          <div class="day-body-element" id="dayEmotionLog"></div>
          <textarea class="day-body-element" id="dayJournalEntry" placeholder="No journal entry" readonly></textarea>
        </div>
        <h2 id="dayRating"></h2>
      </div>
    `;
}

  _createElementObjs() {
     // Elements
     this.titleDate = document.getElementById("dayDate");
     this.journalEntry =  document.getElementById("dayJournalEntry");
     this.emotionLog = document.getElementById("dayEmotionLog");
     this.dayRating = document.getElementById("dayRating");
  }

  _addEventListeners() {
    this.addEvent(Events.LoadDayPage, (data) => this.loadPage(data));
  }

  // Changes view to Day Page
  _render(data) {
    if (data) this.dateData = data;

    this.dateData["journal"] = this.dateData["journal"] 
    ? this.dateData.journal
    : "";

    this.titleDate.textContent = dateFormat(this.dateData.date_id);
    this.journalEntry.textContent = this.dateData.journal;

    // Added Emotions to Log
    this.#renderEmotions();

    // Calculates Daily Rating
    this.#calculateRating();


    this.dayRating.textContent = "Day Score: " + 
    (this.dateData.rating === 0 
    ? "--"
    : this.dateData.rating) 
    + " / 10";
  }
}

