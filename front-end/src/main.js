import { DayComponent } from "./pages/day/DayComponent.js";
import { JournalComponent } from "./pages/day/journal/JournalComponent.js";
import { EventHub } from "./eventhub/EventHub.js";
import { Events } from "./eventhub/Events.js";

new DayComponent()
new JournalComponent()
console.log('Everything loaded')

const today = new Date()
const dateArr = [today.getMonth() + 1, today.getDate(), today.getFullYear()]

const date = {
    month: dateArr[0], // ex: 10 (October)
    day: dateArr[1], // ex: 29
    year: dateArr[2], // ex: 2024
    format: dateArr.join('/'), // Displays in header ex: 10/29/2024
    id: dateArr.join('-'), // ID to pass as key to localStorage ex: 10-29-2024
}

EventHub.getInstance().publish(Events.LoadDayPage, date)


// Data Entry Stored in Database

/**
 * data = {
 *      id: "11-2-2024",
 *      logged_in: true,
 *      daily_ranking: 7.6,
 *      journal_entry: "Today was my birthday!",
 *      emotion_log: [
 *          {
 *              emotion_id: 3, (0: Happy, 1: Sad, 2: Angry, 3: Tired)
 *              magnitude: 5,
 *              description: "I didn't sleep well last night",
 *              timestamp: 08:20,
 *          }
 *          {
 *              emotion_id: 2,
 *              magnitude: 7,
 *              description: "I missed the bus! Now I have to walk to work",
 *              timestamp: 9:00,
 *          }
 *          {
 *              emotion_id: 0,
 *              magnitude: 10,
 *              description: "My friends threw me a surprise party, wow!",
 *              timestamp: 4:55,
 *          }
 *          {
 *              emotion_id: 0,
 *              magnitude: 8,
 *              description: "I got the best gift ever, $100!!!",
 *              timestamp: 17:30,
 *          }
 *      ]
 * 
 * 
 * }
 * 
 * 
 * 
 * 
 * 
 */