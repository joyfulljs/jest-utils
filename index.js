
const $ = require('jquery');

function mockEventBinding() {
  // use jquery to bind/remove event
  const oldBinder = HTMLElement.prototype.addEventListener;
  const oldRemove = HTMLElement.prototype.removeEventListener;

  const newBinder = function (type, callback) {
    this.addEventListener = oldBinder;
    $(this).on(type, callback);
    this.addEventListener = newBinder;
  }

  const newRemove = function (type, callback) {
    this.removeEventListener = oldRemove;
    $(this).off(type, callback);
    this.removeEventListener = newRemove;
  }

  HTMLElement.prototype.addEventListener = newBinder;
  HTMLElement.prototype.removeEventListener = newRemove;

  window.addEventListener = newBinder;
  window.removeEventListener = newRemove;
}

exports.mockEventBinding = mockEventBinding;