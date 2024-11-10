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

    #addJournalEntry(journal) {
        this.dateData['journal_entry'] = journal
        EventHub.getInstance().publish(Events.UpdateDatabase, this.dateData)
    }

    // Appends new emotion entry to Emotion Log
    #addEmotionEntry(emotion_entry) {
        if (!this.dateData['emotions']) this.dateData['emotions'] = []
        this.dateData.emotions.push(emotion_entry)
        this.#calculateRating()
    }

    // Removes the specified emotion element from the Emotion Log
    #removeEmotionEntry(emotion_entry) {
       this.dateDate.emotions = this.dateData.emotions.filter(e => e !== emotion_entry)
       this.#calculateRating()
    }

    // Calculates Daily Ranking based on emotions logged also saves any changed to database
    #calculateRating() {

        EventHub.getInstance().publish(Events.UpdateDatabase, this.dateData)
    }

// Inherited Methods from BaseComponent
    _buildHTML() {
        return `
            <div class="day-container">
                <div class="day-head-element">
                    <h1>Day Page<h1>
                    <h2 id="dayDate">Hello</h2>
                </div>
                
                <div class="day-body-element" id="dayContent">
                    <div class="day-emotion-container">
                        <div class="day-log-entry">
                            <label>Hello1</label>
                        </div>
                        <div class="day-log-entry">
                            <label>Hello2</label>
                        </div>
                        
                    </div>

                    <div class="day-journal-container">
                        <textarea id="dayJournalEntry" placeholder="No journal entry" readonly></textarea>

                        <div id="dayButtons">
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
        hub.subscribe(Events.SummarySubmitted, journal => this.#addJournalEntry(journal))
        hub.subscribe(Events.CheckInSubmitted, emotion => this.#addEmotionEntry(emotion))

        document.getElementById('dayToMain').addEventListener('click', () => this.#goToMainPage())
        document.getElementById('dayToJournal').addEventListener('click', () => this.#goToJournalPage())
        document.getElementById('dayToCheckIn').addEventListener('click', () => this.#goToCheckInPage())
    }

   // Changes view to Day Page
    _render(data) {
        this.dateData = data
        document.getElementById('dayDate').textContent = this.dateData.format 
        document.getElementById('dayJournalEntry').textContent = this.dateData.journal_entry

        // Added Emotions to Log
    }

}
