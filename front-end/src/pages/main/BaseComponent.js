export class BaseComponent {
  constructor(id) {
    this.body = document.createElement('div')
    this.body.classList.add('view')
    this.body.id = id

    const views = document.getElementById('views')

    views.appendChild(this.body)
    this.#initialize()
    //   this.cssLoaded = false;
  }

// Abstract Methods
  /**
   * This is an abstract method that must be implemented by child classes.
   * It must return an HTMLElement object.
   * @abstract
   */
  _buildHTML() {
    throw new Error("_buildHTML method not implemented");
  }

  /**
   * This is an abstract method that must be implemented by child classes.
   * It must return an HTMLElement object.
   * @abstract
   */
  _addCustomEventListeners() {
    throw new Error("_addCustomEventListeners method not implemented");
  }

  /**
   * This is an abstract method that must be implemented by child classes.
   * It must return an HTMLElement object.
   * @abstract
   */
  _render(data) {
    throw new Error("render method not implemented");
  }

// Methods
  _changeDisplay(view) {
    document.getElementById(this.body.id).style.display = view
  }

  #initialize() {
    this._buildHTML()
    this._addCustomEventListeners()
    this._changeDisplay('none')
  }



  // ***********************************************
  // **TODO**: Implement CSS (not a priority for M3)
  // ***********************************************

  // loadCSS(fileName) {
  //   if (this.cssLoaded) return;

  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   // Dynamically load CSS from the same directory as the JS file
  //   link.href = `./components/${fileName}/${fileName}.css`;
  //   document.head.appendChild(link);
  //   this.cssLoaded = true;
  // }

  // dispatchCustomEvent(eventName, detail = {}) {
  //   const event = new CustomEvent(eventName, { detail });
  //   this.parent.dispatchEvent(event);
  // }

  // listenToEvent(eventName, callback) {
  //   this.parent.addEventListener(eventName, callback);
  // }
}
