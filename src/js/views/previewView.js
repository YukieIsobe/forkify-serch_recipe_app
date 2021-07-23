import icons from '../../img/icons.svg';

class PreviewView {
  _generateMarkup(data) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a href="#${data.id}" class="preview__link ${data.id===id?'preview__link--active':''}">
          <figure class="preview__fig">
            <img src="${data.image}" alt="">
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
            <div class="preview__user-generated ${data.key?'':'hidden'}">
              <svg class="preview__icon">
                <use xlink:href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `
  }
}

export default new PreviewView();