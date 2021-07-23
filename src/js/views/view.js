import 'regenerator-runtime/runtime';
import 'core-js/stable';
import icons from '../../img/icons.svg';

export default class View {
  _clear() {
    this._parentEl.innerHTML = '';
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup(this._data);
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  update(data) { 
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if(!newEl.isEqualNode(curEl) && newEl.firstChild && newEl.firstChild.textContent.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        })
      }
    })

    ///// todo: compare and change only text content and attributes
    // 1, use "document.createRange()" to create a range
    // 2, use "createContextualFragment()" to convert to DOM object from string which lives IN MEMORY. this returns "document fragment".
    // const newDOM = document.createRange().createContextualFragment(newMarkup);
    // // create nodelist from DOM and convert to array.
    // const newElements = Array.from(newDOM.querySelectorAll('*'));
    // const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(curElements);

    // newElements.forEach((newEl, i) => {
    //   // updates changed TEXT
    //   if(!newEl.isEqualNode(curElements[i]) && newEl.firstChild?.nodeValue.trim() !== '') {
    //     curElements[i].textContent = newEl.textContent;
    //   }
    //   // updates changed ATTRIBUTES
    //   if(!newEl.isEqualNode(curElements[i])) {
    //     Array.from(newEl.attributes).forEach(attr => 
    //       curElements[i].setAttribute(attr.name, attr.value));
    //   }
    // })
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg class="spinner__icon">
          <use xlink:href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="recipe__error">
      <svg class="recipe__error-icon">
        <use xlink:href="${icons}#icon-alert-triangle"></use>
      </svg>
      <p class="recipe__error-message">
        ${message}
      </p>
    </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="recipe__error">
      <svg class="recipe__error-icon">
        <use xlink:href="${icons}#icon-smile"></use>
      </svg>
      <p class="recipe__error-message">
        ${message}
      </p>
    </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
};

// export default new View();