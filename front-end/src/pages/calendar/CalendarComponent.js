import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";

export class CalendarComponent extends BaseComponent {
  constructor() {
    super("calendarPage", "./pages/calendar/stylesCalendar.css");
    this.dateData = {};
    this._loadFontAwesome();
    this.date = new Date(); // Define `this.date` as a class property
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

  // Builds the HTML of the Calendar Page
  _buildHTML() {
    return `<div class="container">
        <header class="main-header">Main page</header>
        <div class="calendarContainer">
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
          <div class="welcome-back">Welcome back, Jack! How’s it going?</div>
      </div>`;
  }

  // Adds event listeners to the prev and next buttons as well as
  // the feature buttons
  _addEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.LoadMainPage, (data) => this.loadPage(data));

    document.querySelector(".prev").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() - 1);
      this._render();
    });

    document.querySelector(".next").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() + 1);
      this._render();
    });

    document
      .getElementById("main_toJournalPage")
      .addEventListener("click", () => this.#goToPage("journal"));
    document
      .getElementById("main_toCheckInPage")
      .addEventListener("click", () => this.#goToPage("check-in"));
    document
      .getElementById("main_toStatsPage")
      .addEventListener("click", () => this.#goToPage("stats"));
    document
      .getElementById("main_toSummaryPage")
      .addEventListener("click", () => this.#goToPage("summary"));
  }

  _render(data = null) {
    //const date = new Date();
    this.dateData = data;
    this.date.setDate(1);

    const monthDays = document.querySelector(".days");

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

    const months = [
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

    document.querySelector(".date h1").innerHTML = months[this.date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this.date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
    }
    monthDays.innerHTML = days;
  }
}
