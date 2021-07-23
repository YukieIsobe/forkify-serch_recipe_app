// import { search } from "core-js/fn/symbol";

class SearchView {
  // searchBtn = document.querySelector('.search__btn');
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    })
  }
};

export default new SearchView();