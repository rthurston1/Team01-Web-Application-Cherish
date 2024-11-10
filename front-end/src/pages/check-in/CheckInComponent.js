import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";

export class CheckInComponent extends BaseComponent {
  constructor() {
    super("checkInPage", "./pages/check-in/styles.css");
    this.emotionData = {
      emotion_id: null,
      emotion_intensity: 5, // Default intensity
      description: ""
    };
    this.dayData = {
      date_id: new Date(),
      logged_in: false,
      daily_emotions: [],
      daily_rating: 5, // Default daily rating
      journal_entry: ""
    };
  }

  // Build HTML structure for the check-in page
  _buildHTML() {
    return `
      <!-- page -->
    <div class="container">
      <h2>Check-in window</h2>

      <!-- emotions section -->
      <section class="Emotions">
        <!-- label for emotions -->
        <label>Emotions:</label>

          <!-- happy -->
          <label for="happy">
            <input type="radio" name="emotion" id="happy" hidden />
            <img src="img/smile.gif" alt="Happy" class="emoji" />
          </label>
          <!-- neutral -->
          <label for="neutral">
            <input type="radio" name="emotion" id="neutral" hidden />
            <img src="img/neutral.gif" alt="Neutral" class="emoji" />
          </label>
          <!-- meh -->
          <label for="meh">
            <input type="radio" name="emotion" id="meh" hidden />
            <img src="img/emotionless.gif" alt="Meh" class="emoji" />
          </label>
          <!-- goofy ahh -->
          <label for="laugh">
            <input type="radio" name="emotion" id="laugh" hidden />
            <img src="img/laugh.gif" alt="Laugh" class="emoji" />
          </label>
          <!-- worried -->
          <label for="worried">
            <input type="radio" name="emotion" id="worried" hidden />
            <img src="img/worried.gif" alt="Worried" class="emoji" />
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
    EventHub.getInstance().subscribe(Events.LoadCheckInPage, data => this._render(data))

    // Listen for emotion selection
    document.querySelectorAll("input[name='emotion']").forEach((input) => {
      input.addEventListener("change", (event) => {
        this.emotionData.emotion_id = event.target.id;
      });
    });

    // Listen for intensity slider change
    document.getElementById("emotion_intensity").addEventListener("input", (event) => {
      this.emotionData.emotion_intensity = event.target.value;
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
      emotion_intensity: 5,
      description: ""
    };
    document.querySelectorAll("input[name='emotion']").forEach((input) => (input.checked = false));
    document.getElementById("emotion_intensity").value = 5;
    document.getElementById("description").value = "";
  }

  // Submit the check-in data
  _submitCheckIn() {
    const hub = EventHub.getInstance();
    const checkInData = {
      dayData: this.dayData,
      emotionData: this.emotionData
    };

    console.log("Check-in data submitted:", checkInData);
    hub.publish(Events.CheckInSubmitted, checkInData);

    // Reset after submission
    this._resetCheckIn();
  }

  // Render the check-in page
  _render(data = null) {
    document.querySelectorAll(".view").forEach((body) => (body.style.display = "none"));
    this._changeDisplay("flex");
  }
}
