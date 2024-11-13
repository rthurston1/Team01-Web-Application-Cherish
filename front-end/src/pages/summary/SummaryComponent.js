import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../../BaseComponent.js";

export class SummaryComponent extends BaseComponent {
    constructor() {
        super('summaryPage', './pages/summary/stylesSum.css'); // Call the constructor of the parent class
        this.dateData = {};
    } 

    _buildHTML() {
        return `
        <div class="container">
            <div class="tabs">
                <div class="tab-Day" onclick="handleClick(this, 'Day')">Day</div>
                <div class="tab-Week" onclick="handleClick(this, 'Week')">Week</div>
                <div class="tab-Month" onclick="handleClick(this, 'Month')">Month</div>
                <div class="tab-Year" onclick="handleClick(this, 'Year')">Year</div>
            </div>
            <div class="text_box">
                <h2>Summary</h2>
                <div id="summary-text" class="text">Click on a tab to see the summary.</div>
            </div>
            <div class="stats">
                <h3>Stats:</h3>
                <div class="Current Streak">
                    <span>Current Streak ---------> </span>
                    <span>num</span>
            </div>
            <div class="Longest Streak">
                <span>Longest Streak  ---------></span>
                <span>Num</span>
            </div>
            <div class="Prominent Emotions">
                <span>Prominent Emotions ---------></span>
                <span>String</span>
                </div>
                <div class="Happy Avg">
                    <span>Happy Avg ---------></span>
                    <span>String</span>
                </div>
                </div>
            </div>
            `;
    }

    _addEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadSummaryPage, data => this.loadPage(data))

    }

    _render(data) {
        this.dateData = data
    }   
}

export function handleClick(element, period) {

    document.querySelectorAll('.tab-Day, .tab-Week, .tab-Month, .tab-Year').forEach(tab => {
        tab.classList.remove('active-tab');
    });

    // Add 'active-tab' class to the clicked tab
    element.classList.add('active-tab');

    // Update the summary text based on the clicked tab
    const summaryText = document.getElementById('summary-text');
    switch (period) {
        case 'Day':
            summaryText.textContent = "Here's a quick recap of your day: You woke up feeling pretty groggy since you didn’t get much sleep, and even coffee couldn’t shake off the tiredness. Things got better when you had lunch with your friends. It sounds like that really lifted your mood — lots of laughs and a good chance to catch up. You spent some time working on your project, but it was tough to stay focused with all the distractions getting in the way. You tried unwinding by watching a show, but it didn’t fully help. That lingering stress made it hard to relax. And yeah, the test today was pretty rough. You didn’t feel as prepared as you wanted, which added to the day’s challenges. Sounds like it was a bit of a mixed day — but hey, you made it through!";
            break;
        case 'Week':
            summaryText.textContent = "This week has been a rollercoaster of emotions. You had some great moments with friends and family, but also faced some tough challenges at work. You managed to stay positive and keep pushing forward, which is commendable. Keep up the good work!";
            break;
        case 'Month':
            summaryText.textContent = "Over the past month, you've made significant progress in your personal and professional life. You've set new goals and worked hard to achieve them. There were some setbacks, but you didn't let them stop you. Keep striving for excellence!";
            break;
        case 'Year':
            summaryText.textContent = "Looking back at the year, it's clear that you've grown a lot. You've faced many challenges, but you've also had many successes. You've learned new skills, made new friends, and achieved many of your goals. Keep reflecting on your journey and continue to grow!";
            break;
        default:
            summaryText.textContent = "Click on a tab to see the summary.";
            break;
    }
}