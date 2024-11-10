import { EventHub } from '../../eventhub/EventHub.js'
import { Events } from '../../eventhub/Events.js'
import { BaseComponent } from '../main/BaseComponent.js'

export class DayComponent extends BaseComponent {
    constructor() {
        super('dayPage', './pages/day/stylesDay.css')
        this.dateData = {}
    }

// Methods

    #goToMainPage() {
        EventHub.getInstance().publish(Events.LoadMainPage, this.dateData)
    }

    // Calls an event to load journal page
    #goToJournalPage() {
        EventHub.getInstance().publish(Events.LoadJournalPage, this.dateData)
    }

    // Calls an event to load check-in page
    #goToCheckInPage() {
        EventHub.getInstance().publish(Events.LoadCheckInPage, this.dateData)
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
    _buildHTML() {
        return `
            <div class="day-container">
                <h1 id="dayDate"></h1>

                <div class="day-body-element" id="dayContent">
                    <div class="day-log-container" id="dayEmotionLog"></div>

                    <div class="day-log-container" id="dayJournalLog">
                        <textarea id="dayJournalEntry" placeholder="No journal entry" readonly></textarea>

                        <div class="day-button-container" id="dayButtons">
                            <button id="dayToMain">Main Page</button>
                            <button id="dayToJournal">Journal</button>
                            <button id="dayToCheckIn">Check-In</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    _addEventListeners() {
        const hub = EventHub.getInstance()
        hub.subscribe(Events.LoadDayPage, data => this.loadPage(data))

        document.getElementById('dayToMain').addEventListener('click', () => this.#goToMainPage())
        document.getElementById('dayToJournal').addEventListener('click', () => this.#goToJournalPage())
        document.getElementById('dayToCheckIn').addEventListener('click', () => this.#goToCheckInPage())
    }

   // Changes view to Day Page
    _render(data) {
        this.dateData = data
        document.getElementById('dayDate').textContent = this.dateData.format 
        document.getElementById('dayJournalEntry').textContent = this.dateData.journal_entry
    }

}
