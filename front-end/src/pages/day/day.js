import { DayComponent } from "./DayComponent.js"
import { JournalComponent } from "./journal/JournalComponent.js"
import { EventHub } from "../../eventhub/EventHub.js"
import { Events } from "../../eventhub/Events.js"

/**
 * This won't be here once we've fully implemented main calendar page
 * This will all be done in main.js
 */

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
const journalPage = new JournalComponent()
console.log('Everything loaded')

EventHub.getInstance().publish(Events.LoadDayPage, date)