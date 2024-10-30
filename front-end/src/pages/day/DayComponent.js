import { EventHub } from '../../eventhub/EventHub.js'
import { Events } from '../../eventhub/Events.js'
import { BaseComponent } from '../main/BaseComponent.js'
import { JournalComponent } from './journal/JournalComponent.js'

export class DayComponent extends BaseComponent {
    constructor() {
        super('dayPage')
        this.date = {}
    }

// Methods

    // Calls an event to load journal page
    #goToJournalPage() {
        const hub = EventHub.getInstance()
        hub.publish(Events.LoadJournalPage, this.date)
    }

    // Calls an event to load check-in page
    #goToCheckInPage() {
        // TODO: Implement this method
    }

    // Appends new emotion entry to Emotion Log
    #addEmotionEntry(emotion_entry) {
        // TODO: Implement this method
    }

    // Removes the specified emotion element from the Emotion Log
    #removeEmotionEntry(emotion_entry) {
       // TODO: Implement this method
    }

// Inherited Methods from BaseComponent
  
    // Builds HTML Structure return it (Very unreadable right now, will fix later)
    _buildHTML() {
        // Body Children
        const header = document.createElement('h1')
        header.classList.add('body-element')
        header.id = 'date'
        header.textContent = 'TODAY: (MM/DD/YYYY)'

        const content = document.createElement('div')
        content.classList.add('body-element')
        content.id = 'content'

        // Content Children
        const emotions = document.createElement('div')
        emotions.classList.add('scroll-container')
        emotions.id = 'emotionLog'

        const journal = document.createElement('div')
        journal.classList.add('journal-container')
        journal.id = 'journalLog'

        // Journal Children
        const buttons = document.createElement('div')
        buttons.classList.add('button-container')
        buttons.id = 'buttons'

        const textBox = document.createElement('textarea') 
        textBox.id = 'journalEntry'
        textBox.placeholder = 'No journal entry'
        textBox.readOnly = true


        // Buttons Children
        const journalButton = document.createElement('button')
        journalButton.id = 'toJournalPage'
        journalButton.textContent = 'Journal'
        journalButton.addEventListener('click', () => this.#goToJournalPage())

        const checkInButton = document.createElement('button')
        checkInButton.id = 'toCheckInPage'
        checkInButton.textContent = 'Check-In'
        checkInButton.addEventListener('click', () => this.#goToCheckInPage())


        // Appends Children to their Mommies ~UwU~
        this.body.appendChild(header)
        this.body.appendChild(content)
        content.appendChild(emotions)
        content.appendChild(journal)
        journal.appendChild(buttons)
        journal.appendChild(textBox)
        buttons.appendChild(journalButton)
        buttons.appendChild(checkInButton)
    }

    // Adds EventListeners that update class attributes
    _addCustomEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadDayPage, data => this._render(data))
    }

   // Changes view to Day Page
    _render(data) {
        document.querySelectorAll('.view').forEach(body => body.style.display = 'none')

        this.date = data
        document.getElementById('date').textContent = this.date.format 
        document.getElementById('journalEntry').textContent = this.date.journal_entry

        // Displays View
        this._changeDisplay('flex')
    }

}
