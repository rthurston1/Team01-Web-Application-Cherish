import {BaseComponent} from '../main/BaseComponent'
import { EventHub } from  '../../eventhub/EventHub'
import { Events } from '../../eventhub/Events'

export class DayComponent extends BaseComponent {
    constructor() {
        super()
        this.render()
    }

    render() {
        this.#addEventListener()
    }

    #loadJournalData(data) {
        this.journal_entry = data
    }

    #switchToJournalPage() {
        const hub = EventHub.getInstance()
        hub.publish(Events[StoreJournalEntry], this.journal_entry)

        window.location.href = './journal/JournalView'

    }

    #addEventListener() {
        const hub = EventHub.getInstance()

        hub.subscribe(Events[LoadJournalEntry], data => this.#loadJournalData(data))
        document.getElementById('toJournalPage').addEventListener(this.#switchToJournalPage) 
    }
}

const day = new DayComponent()
