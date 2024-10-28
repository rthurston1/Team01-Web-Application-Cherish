import { EventHub } from '../eventhub/EventHub.js';

/**
 * The Service class is an abstract class that provides a common interface for
 * service classes.
 *
 * @abstract
 * @class Service
 */
export default class Service {
  constructor() {
    if (new.target === Service) {
      throw new Error(
        'Service is an abstract class and cannot be instantiated directly'
      );
    }

    this.addSubscriptions();
  }

  addSubscriptions() {
    throw new Error('Subclasses must implement the addSubscriptions method');
  }

  subscribe(event, listener) {
    return EventHub.getInstance().subscribe(event, listener);
  }

  publish(event, data) {
    EventHub.getInstance().publish(event, data);
  }
}
