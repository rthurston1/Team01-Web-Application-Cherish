import { BaseComponent } from '../main/BaseComponent.js'

class SummaryComponent extends BaseComponent {
    constructor() {
        super(); // Call the constructor of the parent class
        this._buildHTML();
        this._addEventListeners();
    } 

    _buildHTML(){
         document.body.innerHTML = `
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

   #returnToDayPage() {
       const hub = EventHub.getInstance()
       hub.publish(Events.LoadDayPage, this.dateData)
    }

    #goToSummaryPage() {
        const hub = EventHub.getInstance()
        hub.publish(Events.LoadSummaryPage, this.dateData)
    }
    _addEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadDayPage, data => this._render(data))

       /// document.getElementById('toSummaryPage').addEventListener('click', () => this.#LoadSummaryPage())
    }
}


export default SummaryComponent;