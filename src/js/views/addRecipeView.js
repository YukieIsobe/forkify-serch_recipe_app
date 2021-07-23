import icons from '../../img/icons.svg';
import View from './view.js'


class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'your recipe was succesfully uploaded!'

  _btn = document.querySelector('.nab__btn--add-recipe');
  _overlay = document.querySelector('.overlay');
  _modal = document.querySelector('.upload-container');
  _btnClose = document.querySelector('.close-btn');
  _modalMessage;

  constructor() {
    super();
    this._addHandlerShowWndow();
    this._addHandlerHideWindow();
    this.addHandlerUpload();
  }

  toggleWindow() {
    this._modal.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWndow() {
    const self = this;
    this._btn.addEventListener('click', function() {
      self.toggleWindow();
    });
  }

  _addHandlerHideWindow() {
    const self = this;
    this._btnClose.addEventListener('click', function() {
      self.toggleWindow();
      self._modalMessage.remove();
    });
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  renderModalMessage(message = this._message) {
    const markup = `
      <div class="upload-message">
        <svg class="upload-message__icon">
          <use xlink:href="${icons}#icon-smile"></use>
        </svg>
        <p class="upload-message__message">
        ${message}
        </p>
      </div>
    `
    this._modal.insertAdjacentHTML('afterbegin', markup);
    this._modalMessage = document.querySelector('.upload-message');
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function(e) {
      e.preventDefault();
      // FormData creates Object which cannot read
      // to make it usefull object, convert to Array and then convert to Object.
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      return handler(data);
    })
  }
}

export default new AddRecipeView();