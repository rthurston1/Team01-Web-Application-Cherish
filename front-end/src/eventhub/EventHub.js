import { debugLog } from "../config/debug.js";
export class EventHub {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  async subscribe(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    debugLog(`Subscribed to event: ${event}`);
    debugLog(`Total listeners for ${event}: ${this.events[event].length}`);

    // Return an unsubscribe function for convenience
    return () => this.unsubscribe(event, listener);
  }

  // Publish an event
  async publish(event, data, emotion_index = null) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => {
      debugLog(`Publishing event: ${event}`);
      listener(data, emotion_index);
    });
  }

  // Unsubscribe from an event
  async unsubscribe(event, listenerToRemove) {
    if (!this.events[event]) return;

    // Filter out the listener that should be removed
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
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
