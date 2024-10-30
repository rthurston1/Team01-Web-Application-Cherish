import { EventHub } from '../../../eventhub/EventHub.js'
import { Events } from '../../../eventhub/Events.js'

export class JournalComponent {
    constructor() {
        this.#initialize()
        this.date = {}
    }

    #changeDisplay(view) {
        document.getElementById('journalPage').style.display = view
    }

    #returnToDayPage() {
       const hub = EventHub.getInstance()
       hub.publish(Events.LoadDayPage, this.date)
       this.#changeDisplay('none')
    }

    #saveJournal() {
        const text = document.getElementById('summary').value
        this.date['journal_entry'] = text
        this.#returnToDayPage()
    }

    #buildHTML() {
        const views = document.getElementById('views')

        // Creates Body Elements
        const body = document.createElement('div')
        body.id = 'journalPage'

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
        views.appendChild(body)
        body.appendChild(header)
        body.appendChild(header2)
        body.appendChild(form)
        form.appendChild(textBox)
        form.appendChild(buttons)
        buttons.appendChild(saveButton)
        buttons.appendChild(cancelButton)
    }

    #addCustomEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadJournalPage, data => this.#render(data))
    }

    #initialize() {
        this.#buildHTML()
        this.#addCustomEventListeners()
        this.#changeDisplay('none')
    }

    #render(date_entry) {
        this.date = date_entry
        if (this.date.journal_entry) document.getElementById('summary').value = this.date.journal_entry
        this.#changeDisplay('block')
    }
}





