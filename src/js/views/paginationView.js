import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const markup = [`
        <button data-goto="${curPage - 1}" class="pagination__btn pagination__btn--prev">
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>` , `
        <button data-goto="${curPage + 1}" class="pagination__btn pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `]

    // 1) if Page = 1 && there are more pages
    if(curPage === 1 && totalPage !== 1) {
      return markup[1];
    }

    // 2) if Page = 1 && there are NO more pages
    if(curPage === 1 && totalPage === 1) {
      return '';
    }

    // 3) if Page !== 1 && there are more pages
    if(curPage !== 1 && totalPage > curPage) {
      return markup.join('');
    }

    // 4) if Page !== 1 && there are NO more pages
    if(curPage !== 1 && totalPage === curPage) {
      return markup[0];
    }
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function(e) {
      const btn = e.target.closest('.pagination__btn');
      if(!btn) return;
      handler(+btn.dataset.goto);
    })
  }
}

export default new PaginationView();