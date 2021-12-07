import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries.js'
const DEBOUNCE_DELAY = 300;
import countriesListTpl from '../templates/list.hbs'
import countryCardTpl from '../templates/cards.hbs'
import debounce from 'lodash.debounce'

const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// change default delay of the error notice
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
    const inputValue = e.target.value.trim();
    if (inputValue === "") {
        clearContent();
        return
    };

    fetchCountries(inputValue)
        .then(countries => {
        if (countries.status === 404) {
            onError();
        };

        if (countries.length === 1) {
            renderMarkup(...countries, countryCardTpl);
            return
        };

        if (countries.length >= 2 && countries.length <= 10) {
            renderMarkup(countries, countriesListTpl);
            return
        };

        if (countries.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
            clearContent();
        };
        })
        .catch((error) => {
            console.log(error)
            onError();
        })
};

function showNotification(message) {
    error({
        text: `${message}`,
    });
};

function renderMarkup(countries, template) {
    const markup = template(countries);
    countryInfo.content.innerHTML = markup;
};

function clearContent() {
    countryInfo.content.innerHTML = "";
};

function onError() {
    Notify.failure("Oops, there is no country with that name")
    showNotification(message);
    clearContent();
}