export class BaseComponent {
  /**
   * @param {string} id HTML body element id
   * @param {string} cssLink file path from src folder
   */
  constructor(id, cssLink) {
    this.#initialize(id, cssLink);
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
  _render(data = null) {
    throw new Error("render method not implemented");
  }

  // Methods
  _changeDisplay(view) {
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

    this.bodyElement.classList.add("view");
    this.bodyElement.id = id;
    this.bodyElement.innerHTML = this._buildHTML();

    this._changeDisplay("none");

    // Adds EventListens
    this._addEventListeners();
  }
}
