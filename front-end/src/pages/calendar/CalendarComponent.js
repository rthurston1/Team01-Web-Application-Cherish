import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";
import { DATABASE } from "../../main.js";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export class CalendarComponent extends BaseComponent {
  constructor(date) {
    super("calendarPage", "./pages/calendar/stylesCalendar.css");
    this.date = date; // Define `this.date` as a class property
    this._loadFontAwesome();

    this.fetchQuote();

  }

  /**
   * Loads the Font Awesome stylesheet for icons.
   */
  _loadFontAwesome() {
    if (!document.querySelector("link[href*='font-awesome']")) {
      // Check if not already added
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
      document.head.appendChild(link);
    }
  }
  fetchQuote() {
    const API_KEY = 'ZxGOe+KJv5SmlSdnVrswfQ==A311wlLd9vmgnYuW';
    const API_URL = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
    
    const quoteData = JSON.parse(localStorage.getItem('dailyQuote')) || {};
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    if (quoteData.date === today) {
      // Use the stored quote
      this.displayQuote(quoteData.quote, quoteData.author);
      this.update(Events.LoadQuoteSuccess, { quote: quoteData.quote, author: quoteData.author });
    } else {
      // Fetch a new quote
      this.update(Events.LoadQuote);
  
      fetch(API_URL, {
        headers: {
          'X-Api-Key': API_KEY
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const quote = data[0].quote;
        const author = data[0].author;
        this.displayQuote(quote, author);
  
        // Store the new quote and date
        localStorage.setItem('dailyQuote', JSON.stringify({ date: today, quote, author }));
  
        this.update(Events.LoadQuoteSuccess, { quote, author });
      })
      .catch(error => {
        console.error('Error fetching the quote:', error);
        this.update(Events.LoadQuoteFailed, { error });
      });
    }
  }
  
  // Helper function to display the quote
  displayQuote(quote, author) {
    document.querySelector('.quote-container').innerHTML = `
      <p>"${quote}"</p>
      <p class="quote-author"><strong>- ${author}</strong></p>
    `;
  }
  
  /**
   * Navigates to the specified page by publishing an event to the EventHub.
   * Depending on the page parameter, it publishes different load page events.
   * Work in progress: dateData
   *
   * @param {string} page - The name of the page to navigate to.
   *                        Possible values are "check-in", "journal", "stats", "summary", or any other string for the main page.
   */

  // Builds the HTML of the Calendar Page
  _buildHTML() {
    return `<div class="calendar-container"><div class="welcome-back">Welcome back, Jack! How’s it going?</div>
       <div class="quote-container"> </div>
          <div class="calendar">
            <div class="month">
              <i class="fas fa-angle-left prev"></i>
              <div class="date">
                <h1></h1>
                <p></p>
              </div>
              <i class="fas fa-angle-right next"></i>
            </div>
            <div class="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div class="days"></div>
          </div>
        </div>
          
      </div>`;
  }

  // Adds event listeners to the prev and next buttons as well as
  // the feature buttons
  _addEventListeners() {
    this.addCustomEventListener(Events.LoadMainPage, (data) => this.loadPage(data));

    // Add event listener to the days container
    // When a day is clicked, load the day page and
    // pass the date as a parameter in the format "MM-DD-YYYY"
    document.querySelector(".days").addEventListener("click", (e) => {
      const t = e.target;
      if (t.classList.contains("day")) {
        const date = t.dataset.date;
        // Restore the data for the selected day
        DATABASE.restoreDay(date).then((data) => {
          console.log("Done!");
          this.update(Events.LoadDayPage, data);
        });

        console.log(`Loading ${date}...`);
      }
    });

    document.querySelector(".prev").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() - 1);
      this._render();
    });

    document.querySelector(".next").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() + 1);
      this._render();
    });
  }

  _render(data) {
    // Month offset constants for previous, current, and next month
    const PREV = 0,
      CURR = 1,
      NEXT = 2;

    this.date.setDate(1);

    const monthDays = document.querySelector(".days");
    // Clear the old calendar
    monthDays.innerHTML = "";

    const lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();

    //const firstDayIndex = this.date.getDay();
    const firstDayIndex = (this.date.getDay() + 7) % 7; // Adjust start day to Monday

    const lastDayIndex = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    document.querySelector(".date h1").innerHTML = MONTHS[this.date.getMonth()] + " " + this.date.getFullYear();
    document.querySelector(".date p").innerHTML = new Date().toDateString();

    // **** Helper functions ****//
    // Generates a day div with a specified `monthOffset`, `className` and `day`
    const generateDayDiv = (monthOffset, className = null, day) => {
      const div = document.createElement("div");
      div.textContent = day;
      div.classList.add("day");
      if (className) div.classList.add(className);

      let month = this.date.getMonth() + monthOffset;
      let year = this.date.getFullYear();
      // Check if month and year need to be adjusted
      if (month > 12) {
        month = 1;
        year++;
      } else if (month < 1) {
        month = 12;
        year--;
      }
      div.dataset.date = `${month}-${day}-${year}`;
      return div;
    };
    // Returns if the day is today
    const isToday = (day) =>
      day === new Date().getDate() &&
      this.date.getMonth() === new Date().getMonth() &&
      this.date.getFullYear() === new Date().getFullYear();
    // **** End of Helper functions ****//

    // Generate the previous month days
    for (let i = firstDayIndex; i > 0; i--) {
      const div = generateDayDiv(PREV, "prev-date", prevLastDay - i + 1);
      monthDays.appendChild(div);
    }
    // Generate the current month days
    for (let i = 1; i <= lastDay; i++) {
      const div = generateDayDiv(CURR, isToday(i) ? "today" : null, i);
      monthDays.appendChild(div);
    }
    // Generate the next month days
    for (let j = 1; j <= nextDays; j++) {
      const div = generateDayDiv(NEXT, "next-date", j);
      monthDays.appendChild(div);
    }
  }
}
