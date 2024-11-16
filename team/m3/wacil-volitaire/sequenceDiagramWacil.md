sequenceDiagram
    participant User
    participant UI
    participant Backend
    participant IndexedDB

    User->>UI: Select day rating (1-4 options)
    UI->>UI: Display selected rating
    User->>UI: Enter description (optional)
    UI->>UI: Display description
    User->>UI: Record audio log (optional)
    UI->>UI: Display recorded audio

    UI->>Backend: Send day rating, description, and/or audio log
    Backend->>Backend: Validate input
    Backend->>IndexedDB: Store data (rating, description, audio)
    IndexedDB-->>Backend: Confirmation of storage
    Backend-->>UI: Success or error response
    UI-->>User: Display submission confirmation or error message

