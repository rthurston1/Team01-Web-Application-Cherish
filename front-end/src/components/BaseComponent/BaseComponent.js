export class BaseComponent {
  constructor() {
    //   this.cssLoaded = false;
  }

  /**
   * This is an abstract method that must be implemented by child classes.
   * It must return an HTMLElement object.
   * @abstract
   * @returns {HTMLElement}
   */
  render() {
    throw new Error("render method not implemented");
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

  dispatchCustomEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    this.parent.dispatchEvent(event);
  }

  listenToEvent(eventName, callback) {
    this.parent.addEventListener(eventName, callback);
  }
}
