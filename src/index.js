import './css/styles.css';

const DEBOUNCE_DELAY = 300;
fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
import debounce from 'lodash.debounce'

// change default delay of the error notice
defaults.delay = 3000;

refs.input.addEventListener('input', debounce(onInputChange, 500));

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
            const message = "Too many matches found. Please enter a more specific query!";
            showNotification(message);
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
    refs.content.innerHTML = markup;
};

function clearContent() {
    refs.content.innerHTML = "";
};

function onError() {
    const message = 'There is no such country!';
            showNotification(message);
            clearContent();
}