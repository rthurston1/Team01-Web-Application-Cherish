import { EventHub } from "./eventhub/EventHub.js";

export class BaseComponent {
  /**
   * @param {string} id HTML body element id
   * @param {string} cssLink file path to file from src folder
   */

  constructor(id, cssLink) {
    this.#initialize(id, cssLink);
    this._eventListenersAdded = false;
  }

  // Abstract Methods
  /**
   * Builds the body's innerHTML
   * @abstract
   * @returns {string}
   */
  _buildHTML() {
    throw new Error("_buildHTML method not implemented");
  }

  /**
   * Adds event listeners to HTML elements
   * Adds any custom events listeners
   * @abstract
   * @returns {void}
   */
  _addEventListeners() {
    throw new Error("_addCustomEventListeners method not implemented");
  }

  /**
   * Displays the current view. Attributes within
   * view dynamically change depending on the data
   * passed as an argument.
   *
   * @abstract
   *
   * @param {any} data
   * @returns {void}
   */
  _render(data, emotion = null) {
    throw new Error("_render method not implemented");
  }

  /**
   * OPTIONAL FUNCTION
   * Creates references to HTML elements in Component
   * Does not need to be implemented
   */
  _createElementObjs() {}

  // Methods

  // Adds a custom event listener to the component
  addCustomEventListener(event, listener) {
    return EventHub.getInstance().subscribe(event, listener);
  }

  // Publishes an event and passes data to its subscribers
  update(event, data = null, emotion_index = null) {
    return EventHub.getInstance().publish(event, data, emotion_index);
  }

  // Switches the view and renders the page
  loadPage(data, emotion_index = null) {
    document
      .querySelectorAll(".view")
      .forEach((body) => (body.style.display = "none"));

    this._render(data, emotion_index);
    this.#changeDisplay("flex");
  }

  // Private Methods
  #changeDisplay(view) {
    document.getElementById(this.bodyElement.id).style.display = view;
  }

  #initialize(id, cssLink) {
    // Adds CSS File to Head
    this.cssFile = document.createElement("link");
    this.cssFile.rel = "stylesheet";
    this.cssFile.href = cssLink;
    document.head.appendChild(this.cssFile);

    // Build Body
    this.bodyElement = document.createElement("div");
    document.getElementById("views").appendChild(this.bodyElement);
    // Add component to class "feature-buttons" or "view" depending on if it's navigational or page component
    this.bodyElement.classList.add("view");
    this.bodyElement.id = id;
    this.bodyElement.innerHTML = this._buildHTML();

    this._createElementObjs();
    this.#changeDisplay("none");

    // Adds EventListens
    if (!this._eventListenersAdded) {
      this._addEventListeners();
      this._eventListenersAdded = true;
    }
  }
}
