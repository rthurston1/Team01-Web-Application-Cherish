# Cherish Data

## Data Types
### Calendar
  - **Description**: Hold information regarding the current month and the days. 
  - _Attributes:_
    - `date` (`Date`): Displays today's date.
  - **Data Source**: System-generated, based on user's inputs for each day.

### Day
 - **Description**: Tracks an individual day's user-logged information
 - _Attributes:_
   - `date_id` (`string`): The date corresponding to the day (unique identifier in the database).
   - `emotions` (`Emotion[]`): A list of emotions that the user felt during the day.
   - `rating` (`number`): The overall emotion score of the day, out of 10. (The higher the score, the better day you had!).
   - `journal` (`string`): A space for users to write an overall summary for their day (not required, can be left empty).
 - **Data Source** System-generated, based on the users inputs from the emotions they've logged and journal entry.

### Emotion
  - **Description**: Represents an emotion the user is feeling during the day
  - _Attributes:_
    - `emotion_id` (`string`): A unique identifier for the emotion. (Emotions: Happy, Sad, Angry, Anxious, Disgusted, Neutral)
    - `magnitude` (`number`): A ranking system on a scale of 1 to 10 on how strong the emotion is.
    - `description` (`string`): An explanation to why a user feels the emotion (Not required, can be left empty).
    - `timestamp` (`string`): The time (hour:minute) an emotion was logged.
  - **Data Source** User-input, the user will input their emotion with a brief description.

## Data Relations
- **Calendar to Day:** One-to-Many, the calendar has multiple days, all with unique entries.
- **Day to Calendar:** Many-to-One, all days refer back to one calendar.
- **Day to Emotion:** One-to-Many, each day can have multiple emotions.
- **Emotion to Day:** Many-to-One, each emotion corresponds to one day.

## Data Sources
- **User-Input Data:** Entered by the user.
- **System-Generated Data:** Data is taken from user inputs and distributed to various sections in the application.
- **IndexedDB:** A client-side database used to store and collect data inputted by the user.

## IndexedDB Integration
The indexedDB design is very simple. The application can make requests to retrieve or store data.

### Data Retrieval
  -  The user clicks on any date on the main page (the calendar). Then the application makes `get` request to the database to fetch the data for the clicked on day. After retrieving the data, the app loads up the day view with the stored data.
  - If the key (date clicked on) is not found in the database, then a new blank entry is initialized.

### Data Collection
  - After the user submits a check-in or saves their journal entry for a given day, the application makes a `put` request to store/update a day entry in the database.


