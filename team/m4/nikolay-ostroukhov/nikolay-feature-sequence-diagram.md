## Global Navigation Menu

The global navigation menu is a feature that allows users to navigate between different pages of the application. It is a common component that is present on all pages of the application and provides a consistent way for users to switch between different pages of the app.

```mermaid
sequenceDiagram
    participant User
    participant IndexedDB
    participant EventHub
    participant GlobalNavBar
    participant App Container View

    %% Step 1: Application Initialization
    IndexedDB->>IndexedDB: Initialize database
    IndexedDB->>IndexedDB: DATABASE.restoreDay(id)
    IndexedDB-->>EventHub: Resolve data with current day's data
    EventHub->>App Container View: publish(Events.LoadMainPage, data)
    App Container View->>App Container View: Update content to "Main" page
    App Container View-->>User: Display "Main" page

    %% Step 2: Load Navigation Bar
    EventHub->>GlobalNavBar: publish(Events.LoadNav, data)
    GlobalNavBar->>GlobalNavBar: Render navigation buttons

    %% Step 3: User clicks a button (Calendar)
    User->>GlobalNavBar: Clicks a button (e.g., Calendar)
    GlobalNavBar->>EventHub: GlobalNavBar calls EventHub - publish(Events.LoadCalendarPage, data)
    EventHub->>App Container View: EventHub invokes handler - loadPage(data)
    App Container View->>App Container View: Update content to "Calendar" page
    App Container View-->>User: Display updated page (Calendar)

    %% Step 4: User clicks another button (Journal)
    User->>GlobalNavBar: Clicks another button (e.g., Journal)
    GlobalNavBar->>EventHub: GlobalNavBar calls EventHub - publish(Events.LoadJournalPage, data)
    EventHub->>App Container View: EventHub invokes handler - loadPage(data)
    App Container View->>App Container View: Update content to "Journal" page
    App Container View-->>User: Display updated page (Journal)
```
