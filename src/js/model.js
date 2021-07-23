// import { resolve } from 'core-js/fn/promise';
import {API_URL} from './config.js';
// import { getJSON, sendJSON } from './helper.js';
import {AJAX} from './helper.js';
import {RES_PER_PAGE, KEY } from './config.js'
import bookmarkView from './views/bookmarkView.js';

export const state = {
  recipe: {

  },
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1
  },
  bookmarks: []
}

const createRecipeObject = function(data) {
  const {recipe} = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  }
}

export const loadRecipe = async function(id) {
  try {
    // const data = await getJSON(`${API_URL}${id}`);
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);
    if(state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    };
  } catch (err) {
    throw err;
  }
}

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    const resultData = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = resultData.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && {key: recipe.key})
      }
    });
  } catch(err) {
    throw err;
  }
}

export const getSearchResultsPage = function(page = 1) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach (ing => {
    ing.quantity = ing.quantity / state.recipe.servings * newServings;
  });
  state.recipe.servings = newServings;
}

const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
}

export const removeBookmark = function(id) {
  // Deleate bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if(id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
}

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ing') && entry[1] !== '').map(ing => ing[1].split(',').map(el => el.trim()));
  
    const newIng = ingredients.map(ing => {
      const [quantity, unit, description] = ing;
      if(ing.length!==3) throw new Error(`ingredient have to put 3 works. try again!`)
      return {quantity: quantity?+quantity:null, unit, description};
    });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.imageUrl,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.prepTime,
      servings: +newRecipe.servings,
      ingredients: newIng,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

  } catch(err) {
    throw err;
  }
}

/////////// only for developpers. for clear the localstorage ////////
const clearBookmarks = function() {
  localStorage.clear('bookmarks');
}
// clearBookmarks();
/////////// /////////// /////////// 

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();


