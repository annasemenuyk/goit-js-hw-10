const BASE_URL = 'https://restcountries.com/v3.1';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}all?fields=name,capital,population,flags,languages`).then(responce => responce.json())
}
