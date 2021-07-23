import icons from '../../img/icons.svg';
import View from './view.js';
import PreviewView from './previewView.js';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => PreviewView._generateMarkup(bookmark)).join('');
  }
}
export default new BookmarkView();