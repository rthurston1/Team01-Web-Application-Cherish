# Cherish Data

## Data Types

### Calendar
  - **Description**: Hold information regaurding the current month and the days. 
  -_Attributes:_
    - `days` (Day[]): The list of all the days in the current month.
    - `current_day` (date): Displays today's date.
    - `streak` (number): The number of consecutive days the user has logged their daily emotion.
  - **Data Source**: System-generated, based on user's inputs for each day.

### Day
 - **Description**: Tracks an individual day's user-logged information
 - _Attributes:_
   - `date_id` (date): The date corresponding to the day.
   - `logged_in` (boolean): True if the user filled out information for the current day (false if the day was skipped).
   - `daily_emotions` (Emotion[]): A list of emotion that the user felt during the day.
   - `daily_rating` (number): The overall emotion score of the day. (The higher the score, the better day you had!).
   - `jorunal_entry` (string): A space for users to write an overall summary for their day
 - **Data Source** System-generated, based on the users inputs from the emotions they've logged. Also User-input, for logging in journal entries

### Emotion
  - **Description**: Represents a emotion the user is feeling during the day
  - _Attributes:_
    - `emotion_id` (number): A unique identifier for the emotion (Ex: Happy: 0, Sad: 1, Angry: 2,...).
    - `emotion_intensity` (number): A ranking system on a scale of 1 to 10 on how strong the emotion is.
    - `emotion_color` (color): The color the belongs to this emotion (NOTE: We may implement a feature that allows users to pick custom colors for their emotions)
    - `description` (string): An explaination to why a user feels the emotion (Not required, can be left empty).
  - **Data Source** User-input, the user will input their emotion with a breif decription.

## Data Relations
- **Calendar to Day:** One-to-Many, the calednar has multiple days, all with unqiue entries.
- **Dat to Calendar:** Many-to-One, all days refer back to one calendar.
- **Day to Emotion:** One-to-Many, each day can have multiple emotions.
- **Emotion to Day:** Many-to-One, each emotion corresponds to one day.

## Data Sources
-**User-Input Data:** Entered by the user.
-**System-Generated Data:** Data is taken from user inputs and distributed to various sections in the application.

