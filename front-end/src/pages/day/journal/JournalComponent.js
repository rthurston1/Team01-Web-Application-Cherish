import { BaseComponent } from "../../main/BaseComponent"
import { EventHub } from  '../../eventhub/EventHub'
import { Events } from '../../eventhub/Events'

export class JournalComponent extends BaseComponent {
    constructor() {
        super()
        this.render()
    }

    render() {
        this.#addEventListener()
    }

    #loadJournal(data) {
        this.journal = data
    }

    #returnToDayPage() {
        window.location.href = '../DayView.html'
    }

    #saveJournal(journal) {
        const hub = EventHub.getInstance()
        hub.publish(Events[LoadJournalEntry], journal)

        this.#returnToDayPage()
    }

    #addEventListener() {
        const hub = EventHub.getInstance()

        hub.subscribe(Events[StoreJournalEntry], data => this.#loadJournal(data))
        document.getElementById('save').addEventListener()
        document.getElementById('cancel').addEventListener(this.#returnToDayPage)
    }
}

const journal = new JournalComponent()
