import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries.js';
import countriesListTpl from '../templates/list.hbs';
import countryCardTpl from '../templates/cards.hbs';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countrySearch = document.querySelector('.country-list');
const countryContent = document.querySelector('.country-info');

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

// searchInput.addEventListener('input', event => {
//     const value = event.target.value;
//     console.log(`value`,value)
//     fetchCountries(value)
//     .then(data => console.log(data));
// });
searchInput.addEventListener('input', debounce(onInputChangeClear, DEBOUNCE_DELAY));

function onInputChangeClear(event) {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    if (inputValue === "") {
        clearContent();
        return
    };
    fetchCountries(onInputChangeClear)
    .then(fetchCountriesCardsRender)
    .catch((error) => {
        console.log(error);
        clearContent();})}

function fetchCountriesCardsRender(countries) {
      // console.log(countries.length)
       if (countries.length === 1) {
        Notify.info("Too many matches found. Please enter a more specific name.");
            clearContent();
       
    } else if (10 < countries.length > 1){
        countrySearch.content.innerHTML(countries, countriesListTpl);
        return
    }
    else if(countries.length > 10 && searchInput.value.trim() !== ''&&countries.status === 404) {
        Notify.failure("Oops, there is no country with that name");
        clearContent();
    }
    countryContent.content.innerHTML(...countries, countryCardTpl);
    return        
    };

function clearContent() {
    countryContent.innerHTML = '', 
    countrySearch.innerHTML = '';
};