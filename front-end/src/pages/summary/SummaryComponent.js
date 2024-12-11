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

  /** (Function written by Jesse Goldman @jss4830)
   * 
   * Emotion Trend Analysis allows users to monitor emotional trends over a given date range. A user selects a date range, and based on that range, emotion data will be aggregated into these statistics:
      Most frequent emotion, Average daily rating over that date range, Count of each emotion selected over that range, Longest streak of a given emotion
   * @returns an object containing mostFrequentEmotion, averageRating, emotionCounts, and longestStreak
   */
      #calculateTrendData(startDate, endDate){
        const userData = DATABASE.restoreUserData(); //get the user data
    
        //filter out data according to user-selected range
        const filteredData = Object.values(userData).filter(day => {
          const dayDate = new Date(day.date_id);
          return dayDate >= new Date(startDate) && dayDate <= new Date(endDate);
        });
    
        const emotionCounts = {};
        let totalRating = 0;
        let totalDays = 0;
        let longestStreak = {emotion: null, length: 0};
        let currentStreak = {emotion: null, length: 0};
    
        //iterate over filtered date data to calculate trends
        filteredData.forEach(day => {
          totalRating += day.rating;
          totalDays += 1;
    
          day.emotions.forEach(emotion => {
            if(!emotionCounts[emotion.emotion_id]) {
              emotionCounts[emotion.emotion_id] = 0;
            }
            emotionCounts[emotion.emotion_id] += 1;
    
            if(currentStreak.emotion === emotion.emotion_id) {
              currentStreak.length += 1;
            }else{
              if(currentStreak.length > longestStreak.length){
                longestStreak = {...currentStreak};
              }
              currentStreak = {emotion: emotion.emotion_id, length: 1};
            }
          });
        });
    
        if(currentStreak.length > longestStreak.length) {
          longestStreak = {...currentStreak};
        }
    
        const mostFrequentEmotion = Object.keys(emotionCounts).reduce((acc, curr) => emotionCounts[acc] > emotionCounts[curr] ? acc : curr);
        return {
          mostFrequentEmotion,
          averageRating: totalRating / totalDays,
          emotionCounts,
          longestStreak
        };
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
          <div class="trend-data">
            <h3>Trends:</h3>
            <div>
              <span>Most Frequent Emotion:</span>
              <span id="most-frequent-emotion">N/A</span>
            </div>
            <div>
              <span>Average Rating:</span>
              <span id="average-rating">N/A</span>
            </div>
            <div>
              <span>Longest Streak:</span>
              <span id="longest-streak">N/A</span>
            </div>
          </div>
          <div class="date-range">
            <label for="startDate">From:</label>
            <input type="date" id="startDate" name="startDate">
            <label for="endDate">To:</label>
            <input type="date" id="endDate" name="endDate">
            <button id="calculate-trend-btn" class="btn">Get Trend Data</button>
          </div>
          <button id="export-csv-btn" class="btn">Export CSV</button>
        </div>
      `;
    }

    _addEventListeners() {
      this.addCustomEventListener(Events.LoadSummaryPage, (data) => this.loadPage(data));
  
      this.dayTabButton.addEventListener("click", () => this.#handleClick(this.dayTabButton, "Day"));
      this.weekTabButton.addEventListener("click", () => this.#handleClick(this.weekTabButton, "Week"));
      this.monthTabButton.addEventListener("click", () => this.#handleClick(this.monthTabButton, "Month"));
      this.yearTabButton.addEventListener("click", () => this.#handleClick(this.yearTabButton, "Year"));
  
      this.exportCsvBtn.addEventListener("click", () => this.#exportCSV());
  
      this.calculateTrendBtn.addEventListener("click", () => {
        const startDate = this.startDateInput.value;
        const endDate = this.endDateInput.value;
        if (startDate && endDate) {
          const trendData = this.#calculateTrendData(startDate, endDate);
          this.#displayTrendData(trendData);
        } else {
          alert('Please select both start and end dates.');
        }
      });
    }
  
    #displayTrendData(trendData) {
      this.mostFrequentEmotionLabel.textContent = trendData.mostFrequentEmotion || "N/A";
      this.averageRatingLabel.textContent = trendData.averageRating.toFixed(2) || "N/A";
      this.longestStreakLabel.textContent = `${trendData.longestStreak.emotion} (${trendData.longestStreak.length} days)` || "N/A";
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
    this.exportCsvBtn = document.getElementById("export-csv-btn");
    this.startDateInput = document.getElementById("startDate");
    this.endDateInput = document.getElementById("endDate");
    this.calculateTrendBtn = document.getElementById("calculate-trend-btn");
    this.mostFrequentEmotionLabel = document.getElementById("most-frequent-emotion");
    this.averageRatingLabel = document.getElementById("average-rating");
    this.longestStreakLabel = document.getElementById("longest-streak");
  }
}
