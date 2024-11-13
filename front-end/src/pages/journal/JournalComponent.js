import { Events } from '../../eventhub/Events.js'
import { BaseComponent } from '../../BaseComponent.js'
import { dateFormat } from '../day/DayComponent.js'

export class JournalComponent extends BaseComponent {
    constructor() {
        super('journalPage', './pages/journal/stylesJournal.css')
        this.dateData = {}
    }

// Methods
    // Stores value in text area to date object
    #saveJournal() {
        this.dateData['journal'] = this.summaryElement.value
        this.update(Events.UpdateDatabase, this.dateData)
    }

    // Reverts any changes to journal submission
    #restoreJournal() {
        this.summaryElement.value = this.dateData['journal']
        ? this.dateData.journal
        : ""
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

    _createElementObjs() {
        this.titleDate = document.getElementById('journalDate')
        this.summaryElement = document.getElementById('journalSummary')
        this.saveButton = document.getElementById('saveJournal')
        this.cancelButton = document.getElementById('cancelJournal')
    }

    // Adds EventListeners that update attributes in the class
    _addEventListeners() {
        this.addEvent(Events.LoadJournalPage, data => this.loadPage(data))

        this.saveButton.addEventListener('click', () => this.#saveJournal())
        this.cancelButton.addEventListener('click', () => this.#restoreJournal())
    }

    // Changes the current view to the Journal Page
    _render(data) {
        this.dateData = data

        this.titleDate.textContent = dateFormat(this.dateData.date_id)
        this.#restoreJournal()
    }

}





