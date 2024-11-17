# Check-In Component Sequence Diagram

This sequence diagram illustrates the interaction flow within the Check-In Component of the application. It highlights how the **User**, **CheckInComponent**, and **Events** interact during the check-in process.

```mermaid
sequenceDiagram
    participant User
    participant CheckInComponent
    participant Events

    User ->> CheckInComponent: Open Check-In Page
    CheckInComponent ->> CheckInComponent: _render()
    CheckInComponent ->> CheckInComponent: _loadEmotion()

    User ->> CheckInComponent: Select Emotion
    CheckInComponent ->> CheckInComponent: Update emotionData.emotion_id

    User ->> CheckInComponent: Adjust Intensity
    CheckInComponent ->> CheckInComponent: Update emotionData.magnitude

    User ->> CheckInComponent: Write Description
    CheckInComponent ->> CheckInComponent: Update emotionData.description

    User ->> CheckInComponent: Click Confirm
    CheckInComponent ->> CheckInComponent: Validate Inputs
    CheckInComponent ->> CheckInComponent: Add Timestamp
    CheckInComponent ->> Events: Store Data
    Events -->> CheckInComponent: Store Data Response
    CheckInComponent ->> CheckInComponent: Reset Form

    User ->> CheckInComponent: Click Cancel
    CheckInComponent ->> CheckInComponent: Reset Form

