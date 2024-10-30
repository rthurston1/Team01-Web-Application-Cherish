import { EventHub } from '../../../eventhub/EventHub.js'
import { Events } from '../../../eventhub/Events.js'
import { BaseComponent } from '../../main/BaseComponent.js'

export class JournalComponent extends BaseComponent {
    constructor() {
        super('journalPage')
        this.date = {}
    }

// Methods
    // Returns to Day Page, passes any changes to the date object through an event
    #returnToDayPage() {
       const hub = EventHub.getInstance()
       hub.publish(Events.LoadDayPage, this.date)
    }

    // Stores value in text area to date object
    #saveJournal() {
        this.date['journal_entry'] = document.getElementById('summary').value
        this.#returnToDayPage()
    }

// Inherited Methods
    // Builds the HTML Structure (Very unreadable right now, will try to implement it differently)
    _buildHTML() { 
        // Body Children
        const header = document.createElement('h1')
        header.textContent = 'Journal Page'

        const header2 = document.createElement('h2')
        header2.textContent = 'Write Your Daily Summary Below!'

        const form = document.createElement('form')
        form.classList.add('text-submission')
        form.id = 'daySummary'

        // From Children
        const textBox = document.createElement('textarea')
        textBox.id = 'summary'
        textBox.placeholder = 'Write your summary here (2000 character limit)'
        textBox.maxLength = 1000

        const buttons = document.createElement('div')

        // Buttons Children
        const saveButton = document.createElement('button')
        saveButton.id = 'save'
        saveButton.type = 'button'
        saveButton.textContent = 'Save'
        saveButton.addEventListener('click', () => this.#saveJournal())

        const cancelButton = document.createElement('button')
        cancelButton.id = 'cancel'
        cancelButton.type = 'button'
        cancelButton.textContent = 'Cancel'
        cancelButton.addEventListener('click', () => this.#returnToDayPage())

        // Appends Children to their Papas ~OwO~
        this.body.appendChild(header)
        this.body.appendChild(header2)
        this.body.appendChild(form)
        form.appendChild(textBox)
        form.appendChild(buttons)
        buttons.appendChild(saveButton)
        buttons.appendChild(cancelButton)
    }

    // Adds EventListeners that update attributes in the class
    _addCustomEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadJournalPage, data => this._render(data))
    }

    // Changes the current view to the Journal Page
    _render(date_entry) {
        document.querySelectorAll('.view').forEach(body => body.style.display = 'none')
        this.date = date_entry

        document.getElementById('summary').value = 'journal_entry' in this.date
        ? this.date.journal_entry
        : ''
        
        this._changeDisplay('flex')
    }

}





