import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { DATABASE } from "../../main.js"; //remoteService 
import GeminiService from "../../services/GeminiService.js";

export class SummaryComponent extends BaseComponent {
  constructor() {
    super("summaryPage", "./pages/summary/stylesSum.css"); // Call the constructor of the parent class
    this.dateData = {};
    this.geminiService = new GeminiService();
  }

  async generateSummary(period) {
    return await this.geminiService.generateSummary(period);
  }

  async #handleClick(element, period) {
    this.tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    // Add 'active-tab' class to the clicked tab
    element.classList.add("active-tab");
    const summary = await this.generateSummary(period);
    // Update the summary text based on the clicked tab
    switch (period) {
      case "Day":
        this.summaryText.textContent = summary;
        break;
      case "Week":
        // this.summaryText.textContent = summary;
        break;
      case "Month":
        // this.summaryText.textContent = summary;
        break;
      case "Year":
        // this.summaryText.textContent = summary;
        break;
      default:
        this.summaryText.textContent = "Click on a tab to see the summary.";
        break;
    }
  }

    //export csv Function made by Liam Campbell @ChronoSpirit
    #exportCSV() {
        const fields = ["date_id", "rating", "emotion", "journal"];
        const data = Array.isArray(this.dateData) ? this.dateData : [this.dateData];
    
        const header = fields.join(",");
        const rows = data.map(row =>
            fields.map(field => (row[field] !== undefined ? row[field] : "")).join(",")
        );
        const csvContent = [header, ...rows].join("\n");
    
        // Tries -> creating a blob with the csv content desired and sets it as a text/csv type, a url would be created (this is for downloading purposes)
        try {
            //creates a Blob object with csv content and sets the MIME type to text/csv
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
    
            //Temp achor <a> to trigger the file download
            const a = document.createElement("a");
            a.href = url;
            a.download = "summary.csv"; //File output name
            a.style.display = "none"; //Hides the anchor element
    
            //Appends anchor to the csv. Appends anchor to DOM, when button is clicked, it will trigger the download and then remove anchor from DOM
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error generating CSV:", error);
        }
    }

  _buildHTML() {
    return `
        <div class="summary-container">
            <div class="tabs">
                <div class="tab" id="tab-Day">Day</div>
                <div class="tab" id="tab-Week">Week</div>
                <div class="tab" id="tab-Month">Month</div>
                <div class="tab" id="tab-Year">Year</div>
            </div>
            <div class="text_box">
                <div id="summary-text" class="text">Click on a tab to see the summary.</div>
            </div>
            <div class="stats">
                <h3>Stats:</h3>
                <div>
                    <span>Day Rating:</span>
                    <span id="day-rating">Fetching...</span>
                </div>
                <div>
                    <span>Current Day:</span>
                    <span id="current-day">Fetching...</span>
                </div>
            </div>
            <button id="export-csv-btn" class="btn">Export CSV</button>
        </div>
            `;
  }

  _addEventListeners() {
    this.addCustomEventListener(Events.LoadSummaryPage, (data) =>
      this.loadPage(data)
    );

    this.dayTabButton.addEventListener("click", () =>
      this.#handleClick(this.dayTabButton, "Day")
    );
    this.weekTabButton.addEventListener("click", () =>
      this.#handleClick(this.weekTabButton, "Week")
    );
    this.monthTabButton.addEventListener("click", () =>
      this.#handleClick(this.monthTabButton, "Month")
    );
    this.yearTabButton.addEventListener("click", () =>
      this.#handleClick(this.yearTabButton, "Year")
    );
  }

  _render(data) {
    this.dateData = data;
    this.dayRatingLabel.textContent = this.dateData.rating || "N/A";
    this.currentDayLabel.textContent = this.dateData.date_id || "N/A";
  }

  _createElementObjs() {
    this.dayTabButton = document.getElementById("tab-Day");
    this.weekTabButton = document.getElementById("tab-Week");
    this.monthTabButton = document.getElementById("tab-Month");
    this.yearTabButton = document.getElementById("tab-Year");
    this.dayRatingLabel = document.getElementById("day-rating");
    this.currentDayLabel = document.getElementById("current-day");
    this.tabs = document.querySelectorAll(".tab");
    this.summaryText = document.getElementById("summary-text");
  }
}
