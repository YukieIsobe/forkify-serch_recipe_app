import View from './view.js';
import PreviewView from './previewView.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.search-results__list');
  _errorMessage = "we couldn't find the recipe with the query. try again!";

  _generateMarkup() {
    return this._data.map(result => PreviewView._generateMarkup(result)).join('');
  }
}

export default new ResultsView();