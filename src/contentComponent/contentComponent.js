import '../css/contentComponent.css';

class ContentComponent {
  /**
   * Clears the content of the #content div
   */
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const content = document.querySelector('.errors');
    content.innerHTML = '';
  }
  /**
   *
   * @param {string} message to be displayed on the ui
   */
  displayError(message) {
    const messagePopup = document.createElement('h2');
    messagePopup.classList.add('error-message');
    messagePopup.innerHTML = message;
    this.clearErrors();
    document.querySelector('.errors').appendChild(messagePopup);
  }
}

export default ContentComponent;
