export class EventHub {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  subscribe(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    // Return an unsubscribe function for convenience
    return () => this.unsubscribe(event, listener);
  }

  // Publish an event
  publish(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(data));
  }

  // Unsubscribe from an event
  unsubscribe(event, listenerToRemove) {
    if (!this.events[event]) return;

    // Filter out the listener that should be removed
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }

  // Define a static reference to the EventHub
  static instance = null;

  // Get an instance of the EventHub
  static getInstance() {
    if (!EventHub.instance) {
      EventHub.instance = new EventHub();
    }
    return EventHub.instance;
  }
}

