import { Events } from '../../eventhub/Events.js'
import { BaseComponent } from '../../BaseComponent.js'
import { dateFormat } from '../day/DayComponent.js'

export class JournalComponent extends BaseComponent {
    constructor() {
        super('journalPage', './pages/journal/stylesJournal.css')
        this.dateData = {}
    }

// Methods
    #noChanges() {
        if (!this.dateData["journal"]) return false;
        return this.summaryElement.value === this.dateData.journal;
    }

    // Stores value in text area to date object
    #saveJournal() {
        if (this.#noChanges()) {
            alert("No changes made");
            return;
        }
           
        this.dateData['journal'] = this.summaryElement.value
        this.update(Events.StoreData, this.dateData)

        alert("Journal Saved!")
    }

    // Confirm first, then reverts any changes made
    #cancelJournal() {
        // No changes have been made yet
        if ( this.#noChanges() || !confirm("Cancel Changes?")) return;
        this.#restoreJournal();
    }

    // Reverts any changes to journal submission
    #restoreJournal() {
        this.summaryElement.value = this.dateData['journal']
        ? this.dateData.journal
        : ""
        this.#updateCharCount();
    }

    #updateCharCount() {
        const journalText = document.getElementById('journalSummary').value;
        const characterCount = journalText.length; 
        document.getElementById('wordCount').innerText = `Character Count: ${characterCount}`;
    }

// Inherited Methods
    // Builds and returns HTML structure
    _buildHTML() { 
        return `
            <div class="container">
                <div id="journalHeader">
                    <h1>Journal</h1>
                </div>

                <h2 id="journalDate"></h2>
                <h2>What's on your mind?</h2>

                <form class="text-submission" id="daySummary">
                    <textarea id="journalSummary" placeholder="Write your summary here (2000 character limit)" maxlength="2000"></textarea>
                    <div id="wordCount">Character Count: 0</div> 
                    <div class="journal-buttons">
                        <button id="saveJournal" type="button">Save</button>
                        <button id="cancelJournal" type="button">Cancel</button>
                    </div>
                </form>
            </div>
        `   
    }

    _createElementObjs() {
        this.titleDate = document.getElementById('journalDate')
        this.summaryElement = document.getElementById('journalSummary')
        this.saveButton = document.getElementById('saveJournal')
        this.cancelButton = document.getElementById('cancelJournal')
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
        this.addEvent(Events.StoredDataSuccess, () => {
            console.log(`Stored new journal in database:`);
          })
          this.addEvent(Events.StoredDataFailed, () => {
            console.log(`Failed to store journal in database`);
          })

        this.saveButton.addEventListener("click", () => 
            this.#saveJournal());
        this.cancelButton.addEventListener('click', () => 
            this.#cancelJournal());
        this.summaryElement.addEventListener('input', () => 
            this.#updateCharCount());
    }

    // Changes the current view to the Journal Page
    _render(data) {
        this.dateData = data;

        this.titleDate.textContent = dateFormat(this.dateData.date_id);
        this.summaryElement.value = this.dateData["journal"] 
        ? this.dateData.journal
        : "";

        this.#restoreJournal();
    }

}





