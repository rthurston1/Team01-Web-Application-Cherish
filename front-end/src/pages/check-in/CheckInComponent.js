import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { dateFormat } from "../day/DayComponent.js";

// Gets current time, formats as (HH:MM)
export function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const EMOTIONS = {
  Happy: 'Happy',
  Neutral: 'Neutral',
  Anxious: 'Anxious',
  Sad: 'Sad',
  Angry: 'Angry',
  Disgusted: 'Disgusted'
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

        <!-- why section with text box -->
        <section class="Why">
            <label for="description">Why?</label>
            <textarea
            id="description"
            rows="4"
            placeholder="I had a test today which was pretty rough. I didn’t feel very prepared."
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
    this.addEvent(Events.StoredDataSuccess, () => console.log(`Stored new emotion in database`))
    this.addEvent(Events.StoredDataFailed, () => console.log(`Failed to store emotion in database`))

    //Listen for emotion selection
    document.querySelectorAll("input[name='emotion']").forEach((input) => {
      input.addEventListener("change", (event) => {
          this.emotionData.emotion_id = event.target.id;

          //Update the slider state based on the selected emotion
          if (this.emotionData.emotion_id === EMOTIONS.Neutral) {
              this.emotionData.magnitude = 1;
              document.getElementById("emotion_intensity").value = 1; //set slider value is set to 1 when neutral emotion selected
              document.getElementById("emotion_intensity").disabled = true; //Disable the slider
              document.getElementById("emotion_intensity").classList.add("disabled-slider"); // Add a class to style the slider
          } else {
              document.getElementById("emotion_intensity").value = 5; //reset slider to midpoint 
              document.getElementById("emotion_intensity").disabled = false; //re-enable the slider
              document.getElementById("emotion_intensity").classList.remove("disabled-slider"); //Remove the class to style the slider
          }

          //Update the current emotion text
          document.getElementById("selectedEmotion").textContent = this.emotionData.emotion_id;
      });
  });


    // Listen for intensity slider change
    document.getElementById("emotion_intensity").addEventListener("input", (event) => {
      if (this.emotionData.emotion_id === 'neutral') {
          this.emotionData.magnitude = 1; 
      } else {
          this.emotionData.magnitude = event.target.value;
      }
  });

    // Listen for text area input for description
    document.getElementById("description").addEventListener("input", (event) => {
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
      description: ""
    };
    document.querySelectorAll("input[name='emotion']").forEach((input) => (input.checked = false));

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
    this.emotionData['timestamp'] = getCurrentTime();

    // Adds Emotion to Date Object
    if (!this.dateData["emotions"]) this.dateData["emotions"] = []
    this.dateData.emotions.push(this.emotionData);

    this.update(Events.StoreData, this.dateData);

    // Reset after submission
    this._resetCheckIn();
  }

  // Render the check-in page
  _render(data) {
    this.dateData = data;
    this.emotionData = {
      emotion_id: null,
      magnitude: 5, // Default intensity
      description: ""
    };

    this.titleDate.textContent = dateFormat(data.date_id);
  }
 
}