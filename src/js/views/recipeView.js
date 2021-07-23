import icons from '../../img/icons.svg';
import Fraction from 'fractional';
import View from './view.js';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _data;
  _errorMessage = "we couldn't find that recipe. try again!";

  _generateMarkup(recipe) {
    return `
      <div class="recipe__mainvisual">
        <img src="${recipe.image}" alt="" class="recipe__image">
        <h1 class="recipe__title"><span>${recipe.title}</span></h1>
      </div>
  
      <div class="recipe__details">
        <div class="recipe__info">
          <div class="recipe__info-icon">
            <svg class="recipe__info-icon">
              <use xlink:href="${icons}#icon-clock"></use>
            </svg>
          </div>
          <div class="recipe__info-texts">
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
        </div>
        <div class="recipe__info">
          <div>
            <svg class="recipe__info-icon">
              <use xlink:href="${icons}#icon-users"></use>
            </svg>
          </div>
          <div class="recipe__info-texts">
            <span class="recipe__info-data recipe__info-data--servings">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>
          </div>
          <div class="recipe__servings-buttons">
            <svg data-servings="${recipe.servings - 1}" class="recipe__servings-btn recipe__servings-btn--minus">
              <use xlink:href="${icons}#icon-minus-circle"></use>
            </svg>
            <svg  data-servings="${recipe.servings + 1}"class="recipe__servings-btn recipe__servings-btn--plus">
              <use xlink:href="${icons}#icon-plus-circle"></use>
            </svg>
          </div>
        </div>
  
        <div class="recipe__user-generated-icon ${recipe.key?'':'hidden'}">
          <svg class="recipe__info-right-icon recipe__info-right-icon--user">
            <use xlink:href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="recipe__bookmark-icon">
          <svg class="recipe__info-right-icon recipe__info-right-icon--bookmark">
            <use xlink:href="${icons}#icon-bookmark${recipe.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>
  
      <div class="recipe__ingredients">
        <h2 class="heading-h2">
          recipe ingredients
        </h2>
        <ul class="recipe__ingredients-list">
          ${this._generateMarkupIngredients(recipe)}
        </ul>
      </div>
  
      <div class="recipe__directions">
        <h2 class="heading-h2">how to cook it</h2>
        <p class="recipe__directions-text">This recipe was carefully designed and tested by <span class="recipe__publisher">${recipe.publisher}</span>. Please check out directions at their website.</p>
        <a href="${recipe.sourceUrl}" class="btn recipe__directions-btn">
          <span>directions</span>
          <svg class="recipe__directions-btn-icon">
            <use xlink:href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
    `
  }

  _generateMarkupIngredients(recipe) {
    return recipe.ingredients.map(ing => {
      return `
        <li class="recipe__ingredients-item">
        <svg class="recipe__ingredient-icon">
          <use xlink:href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction.Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `
    }).join('')
  };

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function(e) {
      const btn = e.target.closest('.recipe__servings-btn');
      if(!btn) return;
      if(+btn.dataset.servings > 0) handler(+btn.dataset.servings);
    })
  }
  
  addHandlerAddBookmarks(handler) {
    this._parentEl.addEventListener('click', function(e) {
      const btn = e.target.closest('.recipe__bookmark-icon');
      if(!btn) return;
      handler();
    })
  }
};


export default new RecipeView();
