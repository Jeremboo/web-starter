import gui from 'core/gui';

/**
 * MANAGE ALL HELPERS
 * - gui
 * - webgl
 * - ...
 */
class Helper {
  constructor() {
    this.visible = false;
    this.toggles = [];
    this.toggles.push(gui.toggle);

    this._handleKeydown = this._handleKeydown.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  enable() {
    document.addEventListener('keydown', this._handleKeydown);
  }

  disable() {
    document.removeEventListener('keydown', this._handleKeydown);
    if (this.visible) this.toggle();
  }

  _handleKeydown(e) {
    if (e.keyCode === 192) {
      this.toggle();
    }
  }

  /**
   * Add a fonction to call at each toggle event
   * @param {function} toggleFct ... A function called at each toggle
   */
  addToggle(toggleFct) {
    if (typeof toggleFct === 'function') {
      this.toggles.push(toggleFct);
    }
  }

  /**
   * Toggle the helpers
   */
  toggle() {
    this.visible = !this.visible;

    this.toggles.forEach((_toggle) => {
      _toggle(this.visible);
    });
  }
}

const helper = new Helper();
export default helper;
