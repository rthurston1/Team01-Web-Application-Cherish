import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";

export class CalendarComponent extends BaseComponent {
  constructor() {
    super("calendarPage", "./pages/calendar/stylesCalendar.css");
    this.dateData = {};
  }

  /**
   * Navigates to the specified page by publishing an event to the EventHub.
   * Depending on the page parameter, it publishes different load page events.
   * Work in progress: dateData
   *
   * @param {string} page - The name of the page to navigate to.
   *                        Possible values are "check-in", "journal", "stats", "summary", or any other string for the main page.
   */
  #goToPage(page) {
    const hub = EventHub.getInstance();
    switch (page) {
      case "check-in":
        console.log("Check-in page will be here one day.");
        // hub.publish(Events.LoadCheckInPage, this.dateData);
        break;
      case "journal":
        hub.publish(Events.LoadJournalPage, this.dateData);
        break;
      case "stats":
        console.log("Stats page will be here one day.");
        // hub.publish(Events.LoadStatsPage, this.dateData);
        break;
      case "summary":
        console.log("Summary page will be here one day.");
        // hub.publish(Events.LoadSummaryPage, this.dateData);
        break;
      default:
        hub.publish(Events.LoadMainPage, this.dateData);
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
        </section>
        
        <section class="features-section">
          <h3>Main page features/shortcuts:</h3>
          <div class="feature-buttons">
            <button class="feature-button check-in" id="toCheckInPage">Check-in</button>
            <button class="feature-button journal" id="toJournalPage">Journal</button>
            <button class="feature-button stats" id="toStatsPage">Stats</button>
            <button class="feature-button summary" id="toSummaryPage">Summary</button>
          </div>
        </section>
      </div>`;
  }

  // Renders the calendar
  #renderCalendar() {
    const date = new Date();
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
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

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  }
  monthDays.innerHTML = days;

  // Adds event listeners to the prev and next buttons as well as
  // the feature buttons
  _addEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.LoadMainPage, (data) => this._render(data));
    document.querySelector(".prev").addEventListener("click", () => {
      date.setMonth(date.getMonth() - 1);
      this.#renderCalendar();
    });

    document.querySelector(".next").addEventListener("click", () => {
      date.setMonth(date.getMonth() + 1);
      this.#renderCalendar();
    });

    document
      .getElementById("toJournalPage")
      .addEventListener("click", () => this.#goToPage("journal"));
    document
      .getElementById("toCheckInPage")
      .addEventListener("click", () => this.#goToPage("check-in"));
    document
      .getElementById("toStatsPage")
      .addEventListener("click", () => this.#goToPage("stats"));
    document
      .getElementById("toSummaryPage")
      .addEventListener("click", () => this.#goToPage("summary"));
  }

  _render(data = null) {
    document
      .querySelectorAll(".view")
      .forEach((body) => (body.style.display = "none"));
    this.#renderCalendar();

    // this.dateData = data;
    // document.getElementById("date").textContent = this.dateData.format;

    // Displays View
    this._changeDisplay("flex");
  }
}
