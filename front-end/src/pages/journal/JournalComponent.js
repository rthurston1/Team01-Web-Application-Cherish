import { EventHub } from '../../eventhub/EventHub.js'
import { Events } from '../../eventhub/Events.js'
import { BaseComponent } from '../../BaseComponent.js'
import { dateFormat } from '../day/DayComponent.js'

export class JournalComponent extends BaseComponent {
    constructor() {
        super('journalPage', './pages/journal/stylesJournal.css')
        this.dateData = {}
    }

// Methods
    // Returns to Day Page, passes any changes to the date object through an event
    #returnToDayPage() {
       EventHub.getInstance().publish(Events.LoadDayPage, this.dateData)
    }

    // Stores value in text area to date object
    #saveJournal() {
        EventHub.getInstance().publish(Events.SummarySubmitted, document.getElementById('journalSummary').value)
        this.#returnToDayPage()
    }

// Inherited Methods
    // Builds and returns HTML structure
    _buildHTML() { 
        return `
            <h1>Journal Page</h1>
            <h2 id="journalDate"><h2>
            <h2>Write Your Daily Summary Below!</h2>

            <form class="text-submission" id="daySummary">
                <textarea id="journalSummary" placeholder="Write your summary here (2000 character limit)" maxlength="1000"></textarea>
                <div class="button-container">
                    <button id="saveJournal" type="button">Save</button>
                    <button id="cancelJournal" type="button">Cancel</button>
                </div>
            </form>
        `   
    }

    // Adds EventListeners that update attributes in the class
    _addEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadJournalPage, data => this.loadPage(data))

        document.getElementById('saveJournal').addEventListener('click', () => this.#saveJournal())
        document.getElementById('cancelJournal').addEventListener('click', () => this.#returnToDayPage())
    }

    // Changes the current view to the Journal Page
    _render(data) {
        this.dateData = data

        document.getElementById('journalSummary').value = 'journal_entry' in this.dateData
        ? this.dateData.journal
        : ''

        document.getElementById('journalDate').textContent = dateFormat(this.dateData.date_id)
    }

}





