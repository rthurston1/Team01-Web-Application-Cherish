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


// Gets the emotion name based on its id
export function getEmotionById(emotion_id) {
    switch (emotion_id) {
        case 0:
            return 'Happy';
        case 1:
            return 'Sad';
        case 2:
            return 'Angry';
        case 3:
            return 'Anxious';
        case 4:
            return 'Disgusted';
        default:
            return 'Neutral';
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
        <section class="Emotions">
            <!-- label for emotions -->
            <label>Emotions:</label>

            <!-- happy -->
            <label for="happy">
                <input type="radio" name="emotion" id="happy" hidden />
                <img src="./img/smile.gif" alt="Happy" class="emoji" />
            </label>
            <!-- neutral -->
            <label for="sad">
                <input type="radio" name="emotion" id="sad" hidden />
                <img src="./img/neutral.gif" alt="sad" class="emoji" />
            </label>
            <!-- meh -->
            <label for="angry">
                <input type="radio" name="emotion" id="angry" hidden />
                <img src="./img/emotionless.gif" alt="angry" class="emoji" />
            </label>
            <!-- goofy ahh -->
            <label for="anxious">
                <input type="radio" name="emotion" id="anxious" hidden />
                <img src="./img/laugh.gif" alt="anxious" class="emoji" />
            </label>
            <!-- worried -->
            <label for="disgusted">
                <input type="radio" name="emotion" id="disgusted" hidden />
                <img src="./img/worried.gif" alt="Worried" class="emoji" />
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

    // Listen for emotion selection
    document.querySelectorAll("input[name='emotion']").forEach((input) => {
      input.addEventListener("change", (event) => {
        this.emotionData.emotion_id = event.target.id;

        // ROBBIE CHANGE: Updates the Current Emotion Text
        this.selectEmotionLabel.textContent = this.emotionData.emotion_id; 
      });
    });

    // Listen for intensity slider change
    document.getElementById("emotion_intensity").addEventListener("input", (event) => {
      this.emotionData.magnitude = event.target.value;
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
    this.update(Events.CheckInSubmitted, this.emotionData);

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