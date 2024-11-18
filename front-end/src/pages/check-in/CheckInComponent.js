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

export const EMOTIONS = {
  Happy: "Happy",
  Neutral: "Neutral",
  Anxious: "Anxious",
  Sad: "Sad",
  Angry: "Angry",
  Disgusted: "Disgusted",
};

export function getEmotionById(emotion_id) {
  switch (emotion_id) {
    case 0:
      return EMOTIONS.Happy;
    case 1:
      return EMOTIONS.Neutral;
    case 2:
      return EMOTIONS.Anxious;
    case 3:
      return EMOTIONS.Anxious;
    case 4:
      return EMOTIONS.Angry;
    case 5:
      return EMOTIONS.Disgusted;
    default:
      return EMOTIONS.Neutral;
  }
}

export class CheckInComponent extends BaseComponent {
  constructor() {
    super("checkInPage", "./pages/check-in/stylesCheckIn.css");
    this.dateData = {};
    this.emotionData = [];
    this.editMode = false;
    this.emotion_index = -1;
  }

  // Build HTML structure for the check-in page
  _buildHTML() {
    return `
          <!-- page -->
        <div class="check-in-container">
          <div class="date-header" id="checkInDate"></div>
          <h2 id="selectedEmotion">Care to check In?</h2>

        <!-- emotions section -->
        <!--emojis in order from best to worst: happy -> neutral -> anxious -> sad -> angry -->
        <section class="Emotions">
            <!-- label for emotions -->
            <label>Emotions:</label>

            <!-- Happy -->
            <label for="Happy">
                <input type="radio" name="emotion" id="Happy" hidden />
                <img src="./img/happy.gif" alt="Happy" class="emoji" />
            </label>

            <!-- Neutral -->
            <label for="Neutral">
                <input type="radio" name="emotion" id="Neutral" hidden />
                <img src="./img/neutral.gif" alt="Neutral" class="emoji" />
            </label>

            <!-- Anxious -->
            <label for="Anxious">
                <input type="radio" name="emotion" id="Anxious" hidden />
                <img src="./img/Anxious.gif" alt="Anxious" class="emoji" />
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

       <!-- Create an input container for the text area -->
        <div class="input-container">
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
        </div> <!-- end of input container -->
    </div>
    `;
  }

  // Method to add event listeners
  _addEventListeners() {
    //add event listeners for all pages
    this.addCustomEventListener(Events.LoadCheckInPage, (data, emotion) => {
      this.loadPage(data, emotion);
    });
    this.addCustomEventListener(Events.StoreEmotionSuccess, () =>
      console.log(`Stored new emotion in database`)
    );
    this.addCustomEventListener(Events.StoreEmotionFailed, () =>
      console.log(`Failed to store emotion in database`)
    );

    //Listen for emotion selection
    this.inputEmotions.forEach((input) => {
      input.addEventListener("change", (event) => {
        this.emotionData.emotion_id = event.target.id;

        // ROBBIE CHANGE: Updates the Current Emotion Text
        this.selectEmotionLabel.textContent = this.emotionData.emotion_id;
      });
    });

    // Listen for intensity slider change
    this.magnitudeSlider.addEventListener("input", (event) => {
        if (this.emotionData.emotion_id === "neutral") {
          this.emotionData.magnitude = 1;
        } else {
          this.emotionData.magnitude = event.target.value;
        }
    });

    // Listen for text area input for description
    this.checkInDescription.addEventListener("input", (event) => {
      this.emotionData.description = event.target.value;
    });

    // Cancel button listener
    this.cancelButton.addEventListener("click", () => {
      this._resetCheckIn();
    });

    // Confirm button listener
    this.confirmButton.addEventListener("click", () => {
      this._submitCheckIn(this.editMode);
    });
  }

  _createElementObjs() {
    this.magnitudeSlider = document.getElementById("emotion_intensity");
    this.checkInDescription = document.getElementById("description");
    this.selectEmotionLabel = document.getElementById("selectedEmotion");
    this.titleDate = document.getElementById("checkInDate");
    this.cancelButton = document.querySelector(".cancel");
    this.confirmButton = document.querySelector(".confirm");
    this.inputEmotions = document.querySelectorAll("input[name='emotion']");
  }

  // Reset the check-in form
  _resetCheckIn() {
    this.emotionData = { emotion_id: "", magnitude: 5, description: "" };
    this.inputEmotions.forEach((input) => (input.checked = false));

    // ROBBIE CHANGED: Added Header to Display current emotion picked
    this.selectEmotionLabel.textContent = "Pick One";

    this.magnitudeSlider.value = 5;
    this.checkInDescription.value = "";
  }

  // Submit the check-in data
  _submitCheckIn() {
    // ROBBIE CHANGED: Validates the submission (must choose an emotion)
    if (!this.emotionData.emotion_id) {
      alert("Please select an emotion before submitting");
      return;
    }

    console.log("Submitting check-in data: ", this.emotionData);

    // Get timestamp
    this.emotionData["timestamp"] = getCurrentTime();

    if (!this.dateData.emotions) {
      this.dateData.emotions = [];
    }
    // If not in edit mode, push the new emotion to the array
    if (!this.editMode) {
      // Clone the emotionData object before pushing it to the array
      this.dateData.emotions.push({ ...this.emotionData });
    } else {
      this.dateData.emotions[this.emotion_index] = { ...this.emotionData };
    }

    this.update(Events.StoreData, this.dateData); // Store the updated data

    // Reset after submission
    this._resetCheckIn();
    alert("Emotion Saved!");
    if (this.editMode) {
      this.update(Events.LoadDayPage, this.dateData);
    }
  }

  // Load the emotion data into the check-in form using the emotion index if it exists
  // Otherwise load defaults
  _loadEmotion() {
    // Check if this is an emotion object
    if (
      this.emotion_index &&
      this.dateData &&
      this.dateData.emotions &&
      this.dateData.emotions.length > this.emotion_index &&
      this.emotion_index >= 0
    ) {
      console.log("Loading emotion: ", this.emotion_index);
      this.editMode = true;
      this.emotionData = this.dateData.emotions[this.emotion_index];

      document.getElementById(this.emotionData.emotion_id).checked = true;

      this.magnitudeSlider.value =this.emotionData.magnitude;
      this.checkInDescription.value =this.emotionData.description;
      this.selectEmotionLabel.textContent = this.emotionData.emotion_id;
    } else {
      this.editMode = false;
      console.log("Loading default check in settings.");
      this._resetCheckIn();
    }
  }

  // Render the check-in page
  _render(data, emotion_index) {
    this.emotion_index = emotion_index;
    console.log("emotion_index: ", emotion_index);
    this.dateData = data;
    this._loadEmotion();
    this.titleDate.textContent = dateFormat(data.date_id);
  }
}
