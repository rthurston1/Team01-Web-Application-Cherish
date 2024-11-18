# Sequence Diagram: User Interaction with Check-In Component

This diagram outlines the key steps when a user interacts with the Check-In page:

---

## **User Interaction**  
The user interacts with the UI by selecting emotions, adjusting intensity, providing a description, or saving/canceling their check-in via radio buttons, sliders, text areas, and buttons.

---

## **Page Setup**  
The `CheckInComponent` initializes the page by rendering the UI and loading existing data or setting defaults for new check-ins.

---

## **Emotion Selection and Input**  
- **Select Emotion**: Updates the `emotionData.emotion_id` based on user input.
- **Adjust Intensity**: Captures slider value in `emotionData.magnitude`.
- **Add Description**: Records user input in `emotionData.description`.

---

## **Confirming or Canceling**  
- **Confirm**: Validates input, adds a timestamp, stores the data via `Events`, and resets the form.
- **Cancel**: Resets the form to clear all inputs.

---

## **Purpose**  
This workflow ensures the Check-In Component captures, validates, and stores user emotions while offering flexibility to reset or save inputs seamlessly.

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

