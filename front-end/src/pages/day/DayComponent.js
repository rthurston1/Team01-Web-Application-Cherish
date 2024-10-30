import { EventHub } from '../../eventhub/EventHub.js'
import { Events } from '../../eventhub/Events.js'
import { JournalComponent } from './journal/JournalComponent.js'

export class DayComponent {
    constructor() {
        this.initialize()
        this.date = {}
    }

    #goToJournalPage() {
        const hub = EventHub.getInstance()
        hub.publish(Events.LoadJournalPage, this.date)
        document.getElementById('dayPage').style.display = 'none'
    }

    #goToCheckInPage() {

    }


    #addEmotionEntry(emotion_entry) {
        /**
         * Adds new div element to the Emotion Log
         * This function changes the HTML
         */
    }

    #removeEmotionEntry(emotion_entry) {
        /**
         * Removes the specified emotion element from the Emotion Log
         * This function changes the HTML
         */
    }

    #buildHTML() {
        const view = document.getElementById('views')

        const body = document.createElement('div')
        body.id = 'dayPage'

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
        view.appendChild(body)
        body.appendChild(header)
        body.appendChild(content)
        content.appendChild(emotions)
        content.appendChild(journal)
        journal.appendChild(buttons)
        journal.appendChild(textBox)
        buttons.appendChild(journalButton)
        buttons.appendChild(checkInButton)
    }


    #addCustomEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadDayPage, data => this.render(data))
    }

    // Called when application boots up
    initialize() {
        // Called when first loading application
        this.#buildHTML()
        this.#addCustomEventListeners()
    }

   // Changes view to Day Page
    render(date) {
        this.date = date
        document.getElementById('date').textContent = this.date.format 
        document.getElementById('journalEntry').textContent = this.date.journal_entry
        document.getElementById('dayPage').style.display = 'block' 
    }
}


// This won't be here once we've fully implemented main calendar page
const today = new Date()
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()]

const date = {
    month: dateArr[0], // ex: 10 (October)
    day: dateArr[1], // ex: 29
    year: dateArr[2], // ex: 2024
    format: dateArr.join('/'), // Displays in header ex: 10/29/2024
    id: dateArr.join('-'), // ID to pass as key to localStorage ex: 10-29-2024
}


const dayPage = new DayComponent()

dayPage.render(date)
const journalPage = new JournalComponent()

console.log('Everything loaded')