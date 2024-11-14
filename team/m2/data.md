# Cherish Data

## Data Types

### User Profile
 -**Description**: Contains personal login information.
 -_Attributes_
   - `username` (`string`): The name chosen by the user.
   - `name` (`string`): Preferred name of the user.
   - `password` (`string`): An encrypted string only visible to the user.
   - `email` (`string`): The email linked to the profile.
 - **Data Source**: User-input, when first signing up or updating.

### Calendar
  - **Description**: Hold information regarding the current month and the days. 
  - _Attributes:_
    - `current_day` (`date`): Displays today's date.
    - `streak` (`number`): The number of consecutive days the user has logged their daily emotion.
  - **Data Source**: System-generated, based on user's inputs for each day.

### Day
 - **Description**: Tracks an individual day's user-logged information
 - _Attributes:_
   - `date_id` (`string`): The date corresponding to the day.
   - `logged_in` (`boolean`): True if the user filled out information for the current day (false if the day was skipped).
   - `emotions` (`Emotion[]`): A list of emotions that the user felt during the day.
   - `rating` (`number`): The overall emotion score of the day. (The higher the score, the better day you had!).
   - `journal` (`string`): A space for users to write an overall summary for their day (not required, can be left empty).
 - **Data Source** System-generated, based on the users inputs from the emotions they've logged. Also User-input, for recording in journal entries

### Emotion
  - **Description**: Represents an emotion the user is feeling during the day
  - _Attributes:_
    - `emotion_id` (`string`): A unique identifier for the emotion.
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

