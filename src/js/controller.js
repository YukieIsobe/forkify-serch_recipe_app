import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

if(module.hot) {
  module.hot.accept();
};

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // 1) load recipe and put the data to state
    await model.loadRecipe(id);

    // 2) render recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchRecipe = async function() {
  try {
    resultsView.renderSpinner();

    // 1) Search Recipe
    const query = searchView.getQuery();
    await model.loadSearchResults(query);

    // 2) Render Results
    resultsView.render(model.getSearchResultsPage(1));

    // 3) Render initial pagination
    paginationView.render(model.state.search);

  } catch(err) {
    console.error(err);
    resultsView.renderError();
  }
}

const controlPagination = function(page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlAddBookmarks = function() {
  if(model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  else
    model.addBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // Upload recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render success message
    addRecipeView.renderModalMessage();
    
    // Render recipe
    recipeView.render(model.state.recipe);

    // Add to bookmark
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

  } catch(err) {
    addRecipeView.renderError(err.message);
  }
}

const init = function() {
  bookmarkView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmarks(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchRecipe);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
