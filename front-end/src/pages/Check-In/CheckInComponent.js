import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";

export class CheckInComponent extends BaseComponent {
  constructor() {
    super("checkInPage", "./pages/check-in/styles.css");
    this.emotion = null;
    this.magnitude = 5; // Default magnitude
    this.reason = "";
  }

  // Build HTML structure for the check-in page
  _buildHTML() {
    return `
      <h2>Check-in Window</h2>
      <section class="Emotions">
        <label>Emotions:</label>
        <label for="happy"><input type="radio" name="emotion" id="happy" hidden /><img src="img/smile.gif" alt="Happy" class="emoji" /></label>
        <label for="neutral"><input type="radio" name="emotion" id="neutral" hidden /><img src="img/neutral.gif" alt="Neutral" class="emoji" /></label>
        <label for="meh"><input type="radio" name="emotion" id="meh" hidden /><img src="img/emotionless.gif" alt="Meh" class="emoji" /></label>
        <label for="laugh"><input type="radio" name="emotion" id="laugh" hidden /><img src="img/laugh.gif" alt="Laugh" class="emoji" /></label>
        <label for="worried"><input type="radio" name="emotion" id="worried" hidden /><img src="img/worried.gif" alt="Worried" class="emoji" /></label>
      </section>
      
      <section class="MagnitudeEmotions">
        <label for="magnitude">Magnitude of emotions:</label>
        <input type="range" id="magnitude" name="magnitude" min="1" max="10" step="1" />
        <div class="range-labels"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>
      </section>

      <section class="Why">
        <label for="why">Why?</label>
        <textarea id="why" rows="4" placeholder="Explain your emotion here..."></textarea>
      </section>

      <div class="buttons">
        <button class="cancel">Cancel</button>
        <button class="confirm">Confirm</button>
      </div>
    `;
  }

  // Method to add event listeners
  _addEventListeners() {
    // Listen for emotion selection
    document.querySelectorAll("input[name='emotion']").forEach((input) => {
      input.addEventListener("change", (event) => {
        this.emotion = event.target.id;
      });
    });

    // Listen for magnitude slider change
    document.getElementById("magnitude").addEventListener("input", (event) => {
      this.magnitude = event.target.value;
    });

    // Listen for text area input
    document.getElementById("why").addEventListener("input", (event) => {
      this.reason = event.target.value;
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
    this.emotion = null;
    this.magnitude = 5;
    this.reason = "";
    document.querySelectorAll("input[name='emotion']").forEach((input) => (input.checked = false));
    document.getElementById("magnitude").value = 5;
    document.getElementById("why").value = "";
  }

  // Submit the check-in data
  _submitCheckIn() {
    const hub = EventHub.getInstance();
    const checkInData = {
      emotion: this.emotion,
      magnitude: this.magnitude,
      reason: this.reason,
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
