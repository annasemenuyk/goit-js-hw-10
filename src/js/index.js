import '../css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import countriesListTpl from '../templates/list.hbs';
import countryCardTpl from '../templates/cards.hbs';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countrySearch = document.querySelector('.country-list');
const countryContent = document.querySelector('.country-info');

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

searchInput.addEventListener('input', event => {
    let value = event.target.value;
    console.log(`value`,value)
    fetchCountries(value)
    .then(data => console.log(data));
});
searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    event.preventDefault();

    const searchCountry = searchInput.value.trim();

    if (searchCountry === '') {
        return clearContent();
    } 
    fetchCountries(searchCountry)
    .then(newCountryList)
    .catch(error => {
        clearContent;
        Notiflix.Notify.failure('Oops, there is no country with that name');
        console.log(error);
    });
}

function newCountryList (countries) {
const markup = countryCardTpl(countries);
const markupSearch = countriesListTpl(countries);

console.log(countries.length) 

if (countries.length === 1) {
    countryContent.innerHTML = markup;
    countrySearch.innerHTML = '';
   
} else if (10 < countries.length > 1) {
    
    countrySearch.innerHTML = markupSearch;
    countryContent.innerHTML = '';

} else if(countries.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}  else {
    countrySearch.innerHTML = markupSearch;
    countryContent.innerHTML = '';
} 
}
  
function clearContent() {
    countryContent.innerHTML = '', 
    countrySearch.innerHTML = '';
};