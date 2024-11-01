import { EventHub } from '../../../eventhub/EventHub.js'
import { Events } from '../../../eventhub/Events.js'
import { BaseComponent } from '../../main/BaseComponent.js'

export class JournalComponent extends BaseComponent {
    constructor() {
        super('journalPage', './pages/day/journal/stylesJournal.css')
        this.dateData = {}
    }

// Methods
    // Returns to Day Page, passes any changes to the date object through an event
    #returnToDayPage() {
       const hub = EventHub.getInstance()
       hub.publish(Events.LoadDayPage, this.dateData)
    }

    // Stores value in text area to date object
    #saveJournal() {
        this.dateData['journal_entry'] = document.getElementById('summary').value
        this.#returnToDayPage()
    }

// Inherited Methods
    // Builds and returns HTML structure
    _buildHTML() { 
        return `
            <div id="journalHeader">
                <h1>Journal </h1>
            </div>
            <h2>What's on your mind?</h2>

            <form class="text-submission" id="daySummary">
                <textarea id="summary" placeholder="Write your summary here (2000 character limit)" maxlength="1000"></textarea>
                <div class="button-container">
                    <button id="save" type="button">Save</button>
                    <button id="cancel" type="button">Cancel</button>
                </div>
            </form>
        `   
    }

    // Adds EventListeners that update attributes in the class
    _addEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadJournalPage, data => this._render(data))

        document.getElementById('save').addEventListener('click', () => this.#saveJournal())
        document.getElementById('cancel').addEventListener('click', () => this.#returnToDayPage())
    }

    // Changes the current view to the Journal Page
    _render(date_entry) {
        document.querySelectorAll('.view').forEach(body => body.style.display = 'none')
        this.dateData = date_entry

        document.getElementById('summary').value = 'journal_entry' in this.dateData
        ? this.dateData.journal_entry
        : ''
        
        this._changeDisplay('flex')
    }

}





