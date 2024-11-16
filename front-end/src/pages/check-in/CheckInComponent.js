import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { dateFormat } from "../day/DayComponent.js";

// Gets current time, formats as (HH:MM)
export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export class CheckInComponent extends BaseComponent {
  constructor() {
    super("checkInPage", "./pages/check-in/stylesCheckIn.css");
    this.dateData = {};

    // Elements
    this.selectEmotionLabel = document.getElementById("selectedEmotion");
    this.titleDate = document.getElementById("checkInDate");
  }

  // Build HTML structure for the check-in page
  _buildHTML() {
    return `
      <!-- page -->
    <div class="container">
        <div>
            <h1 id="checkInDate"></h1>
            <h2>Check-in window</h2>

            <!-- ROBBIE CHANGE: New Head Element -->
            <h2 id="selectedEmotion">Pick One</h2> 
        </div>

        <!-- emotions section -->
        <!--emojis in order from best to worst: happy -> neutral -> anxious -> sad -> angry -->
        <section class="Emotions">
            <!-- label for emotions -->
            <label>Emotions:</label>

            <!-- Happy -->
            <label for="Happy">
                <input type="radio" name="emotion" id="Happy" hidden />
                <img src="./img/Happy.gif" alt="Happy" class="emoji" />
            </label>
            <!-- Sad -->
            <label for="Sad">
                <input type="radio" name="emotion" id="Sad" hidden />
                <img src="./img/Sad.gif" alt="Sad" class="emoji" />
            </label>
            <!-- Angry -->
            <label for="Angry">
                <input type="radio" name="emotion" id="Angry" hidden />
                <img src="./img/Angry.gif" alt="Angry" class="emoji" />
            </label>
            <!-- Anxious -->
            <label for="Anxious">
                <input type="radio" name="emotion" id="Anxious" hidden />
                <img src="./img/Anxious.gif" alt="Anxious" class="emoji" />
            </label>
            <!-- Disgusted -->
            <label for="Disgusted">
                <input type="radio" name="emotion" id="Disgusted" hidden />
                <img src="./img/Disgusted.gif" alt="Disgusted" class="emoji" />
            </label>

        </section>

        <!-- magnitude section -->
        <section class="MagnitudeEmotions">
            <!-- label -->
            <label for="emotion_intensity">Intensity of emotions:</label>
            <!-- make a slider for the intensity -->
            <input
            type="range"
            id="emotion_intensity"
            name="emotion_intensity"
            min="1"
            max="10"
            step="1"
            />
            <div class="range-labels">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span
            ><span>6</span><span>7</span><span>8</span><span>9</span
            ><span>10</span>
            </div>
        </section>

        <!-- why section with text box -->
        <section class="Why">
            <label for="description">Why?</label>
            <textarea
            id="description"
            rows="4"
            placeholder="Write your reasoning here (250 character limit)"
            maxLength="250"
            ></textarea>
        </section>

        <!-- cancel and confirm buttons -->
        <div class="buttons">
            <button class="cancel">Cancel</button>
            <button class="confirm">Confirm</button>
        </div>
    </div>
    `;
  }

  // Method to add event listeners
  _addEventListeners() {
    //add event listeners for all pages
    this.addEvent(Events.LoadCheckInPage, (data) => this.loadPage(data));
    this.addEvent(Events.StoredDataSuccess, () =>
      console.log(`Stored new emotion in database`)
    );
    this.addEvent(Events.StoredDataFailed, () =>
      console.log(`Failed to store emotion in database`)
    );
    this.addEvent(Events.StoreEmotionFailed, () =>
      console.log(`Failed to store emotion in database`)
    );

    // Listen for emotion selection
    document.querySelectorAll("input[name='emotion']").forEach((input) => {
      input.addEventListener("change", (event) => {
        this.emotionData.emotion_id = event.target.id;

        // ROBBIE CHANGE: Updates the Current Emotion Text
        this.selectEmotionLabel.textContent = this.emotionData.emotion_id;
      });
    });

    // Listen for intensity slider change
    document
      .getElementById("emotion_intensity")
      .addEventListener("input", (event) => {
        this.emotionData.magnitude = event.target.value;
      });

    // Listen for text area input for description
    document
      .getElementById("description")
      .addEventListener("input", (event) => {
        this.emotionData.description = event.target.value;
      });

    // Cancel button listener
    document.querySelector(".cancel").addEventListener("click", () => {
      this._resetCheckIn();
    });

    // Confirm button listener
    document.querySelector(".confirm").addEventListener("click", () => {
      this._submitCheckIn();
    });
  }

  // Reset the check-in form
  _resetCheckIn() {
    this.emotionData = {
      emotion_id: null,
      magnitude: 5, // ROBBIE CHANGED: Attribute name now matches with data.md file
      description: "",
    };
    document
      .querySelectorAll("input[name='emotion']")
      .forEach((input) => (input.checked = false));

    // ROBBIE CHANGED: Added Header to Display current emotion picked
    document.getElementById("selectedEmotion").textContent = "Pick One";

    document.getElementById("emotion_intensity").value = 5;
    document.getElementById("description").value = "";
  }

  // Submit the check-in data
  _submitCheckIn() {
    // ROBBIE CHANGED: Validates the submission (must choose an emotion)
    if (!this.emotionData.emotion_id) {
      alert("Please select an emotion before submitting");
      return;
    }

    // Get timestamp
    this.emotionData["timestamp"] = getCurrentTime();

    // Adds Emotion to Date Object
    if (!this.dateData["emotions"]) this.dateData["emotions"] = [];

    // this.dateData.emotions.push(this.emotionData);
    this.update(Events.StoreEmotion, this.dateData, this.emotionData);

    // Reset after submission
    this._resetCheckIn();
    alert("Emotion Saved!");
    // this.update(Events.LoadDayPage, this.dateData);
  }

  // Load the emotion data into the check-in form using the emotion object if it exists
  // Otherwise load defaults
  _loadEmotion(emotion = null) {
    // Check if this is an emotion object
    if (emotion && emotion.hasOwnProperty("emotion_id")) {
      this.emotionData = emotion;
      document.getElementById(this.emotionData.emotion_id).checked = true;
      document.getElementById("emotion_intensity").value =
        this.emotionData.magnitude;
      document.getElementById("description").value =
        this.emotionData.description;
    } else {
      this._resetCheckIn();
    }
  }

  // Render the check-in page
  // `data` can be a day or emotion object
  _render(data) {
    this.dateData = data;
    this._loadEmotion(data);
    this.titleDate.textContent = dateFormat(data.date_id);
  }
}
