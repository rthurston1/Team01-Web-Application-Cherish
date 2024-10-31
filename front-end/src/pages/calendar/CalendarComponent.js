import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../main/BaseComponent.js";

export class CalendarComponent extends BaseComponent {
  constructor() {
    super("calendarPage", "./pages/calendar/stylesCalendar.css");
    this.dateData = {};
  }

  // TODO: Implement four buttons to navigate to the following pages:
  // 1. Check-In Page
  // 2. Journal Page
  // 3. Stats Page
  // 4. Summary Page

  #goToCheckInPage() {}
  #goToJournalPage() {
    const hub = EventHub.getInstance();
    hub.publish(Events.LoadJournalPage, this.dateData);
  }
  #goToStatsPage() {}
  #goToSummaryPage() {}

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
            <button class="feature-button stats">Stats</button>
            <button class="feature-button summary">Summary</button>
          </div>
        </section>
      </div>`;
  }

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
      .addEventListener("click", () => this.#goToJournalPage());
    document
      .getElementById("toCheckInPage")
      .addEventListener("click", () => this.#goToCheckInPage());
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
