import { EventHub } from "../eventhub/EventHub.js";
import { Events } from "../eventhub/Events.js";

const hub = EventHub.getInstance();

hub.subscribe(Events.LoadNav, (data) => {
  function goToPage(page) {
    switch (page) {
      case "check-in":
        hub.publish(Events.LoadCheckInPage, data);
        break;
      case "journal":
        hub.publish(Events.LoadJournalPage, data);
        break;
      case "today":
        hub.publish(Events.LoadDayPage, data);
        break;
      case "summary":
        hub.publish(Events.LoadSummaryPage, data);
        break;
      case "calendar":
        hub.publish(Events.LoadMainPage, data);
        break;
      default:
        hub.publish(Events.LoadMainPage, data);
        break;
    }
  }

  function buildHTML() {
    return `
      <button class="nav-btns" id="toCalendarPage" data-header="Calendar" data-color="blueviolet">Calendar</button>
      <button class="nav-btns" id="toCheckInPage" data-header="Check-in" data-color="green">Check-in</button>
      <button class="nav-btns" id="toDayPage" data-header="Today" data-color="orange">Today</button>
      <button class="nav-btns" id="toJournalPage" data-header="Journal" data-color="blue">Journal</button>
      <button class="nav-btns" id="toSummaryPage" data-header="Summary" data-color="gray">Summary</button>
    `;
  }

  function addEventListeners() {
    document.getElementsByClassName("nav")[0].addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-btns")) {
        document.querySelectorAll(".nav-btns").forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");
        const headerText = e.target.getAttribute("data-header");
        const headerColor = e.target.getAttribute("data-color");
        setHeader(headerText, headerColor);
        goToPage(e.target.textContent.toLowerCase());
      }
    });
  }

  function setHeader(headerText, headerColor) {
    const header = document.querySelector(".page-header");
    header.textContent = headerText;
    header.style.backgroundColor = headerColor;
  }

  function setInitialHeader() {
    const initialButton = document.getElementById("toCalendarPage");
    const headerText = initialButton.getAttribute("data-header");
    const headerColor = initialButton.getAttribute("data-color");
    setHeader(headerText, headerColor);
  }

  function render() {
    // Render the navigation bar
    document.getElementsByClassName("nav")[0].innerHTML = buildHTML();
    setInitialHeader();
    addEventListeners();
  }

  render();
});
