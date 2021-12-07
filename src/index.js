import './css/styles.css';
import Notiflix from 'notiflix'
const DEBOUNCE_DELAY = 300;
import debounce from 'lodash.debounce'
const searchBox = document.getElementById('search-box');



// change default delay of the error notice
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
//fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
searchBox.input.addEventListener('input', debounce(onInputChange, 300));
function fetchCountries = name =>{
  return fetch(`https://restcountries.com/v3.1/all?fields=${name},capital,population,flags,languages`)
  .then(response => {
    // Response handling
  })
  .then(name => {
    // Data handling
  }
  .catch(error => {
    // Error handling
  }};
// function onInputChange(e) {
//     const inputValue = e.target.value.trim();
//     if (inputValue === "") {
//         clearContent();
//         return
//     };

//     fetchCountries(inputValue)
//         .then(countries => {
//         if (countries.status === 404) {
//             onError();
//         };

//         if (countries.length === 1) {
//             renderMarkup(...countries, countryCardTpl);
//             return
//         };

//         if (countries.length >= 2 && countries.length <= 10) {
//             renderMarkup(countries, countriesListTpl);
//             return
//         };

//         if (countries.length > 10) {
//             const message = "Too many matches found. Please enter a more specific name.";
//             showNotification(message);
//             clearContent();
//         };
//         })
//         .catch((error) => {
//             console.log(error)
//             onError();
//         })
// };

// function showNotification(message) {
//     error({
//         text: `${message}`,
//     });
// };

// function renderMarkup(countries, template) {
//     const markup = template(countries);
//     refs.content.innerHTML = markup;
// };

// function clearContent() {
//     refs.content.innerHTML = "";
// };

// function onError() {
//     const message = 'There is no such country!';
//             showNotification(message);
//             clearContent();
// }