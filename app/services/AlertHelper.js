class AlertHelper {
  static dropDown;

  static onClose;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static show(type, title, message, interval = 6000) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message, null, interval);
    }
  }

  static setOnClose(onClose) {
    this.onClose = onClose;
  }

  static invokeOnClose(call) {
    call();
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
  }
}

export default AlertHelper;
