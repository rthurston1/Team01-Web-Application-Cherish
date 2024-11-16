## Global Navigation Menu

The global navigation menu is a feature that allows users to navigate between different pages of the application. It is a common component that is present on all pages of the application and provides a consistent way for users to switch between different pages of the app.

```mermaid
sequenceDiagram
participant User
participant GlobalNavBar
participant EventHub
participant App Container View
User->>GlobalNavBar: Clicks a button (e.g., Calendar)
GlobalNavBar->>EventHub: GlobalNavBar calls EventHub - publish(Events.LoadCalendarPage, data)
EventHub->>App Container View: EventHub invokes the handler assigned with event LoadCalendarPage - loadPage(data)
App Container View->>App Container View: Update content to "Calendar" page
App Container View-->>User: Display updated page (Calendar)

    User->>GlobalNavBar: Clicks another button (e.g., Journal)
    GlobalNavBar->>EventHub: GlobalNavBar calls EventHub - publish(Events.LoadJournalPage, data)
    EventHub->>App Container View: EventHub invokes the handler assigned with event LoadJournalPage - loadPage(data)
    App Container View->>App Container View: Update content to "Journal" page
    App Container View-->>User: Display updated page (Journal)
```
