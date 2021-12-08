const BASE_URL = 'https://restcountries.com/v3.1';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/all?fields=name,capital,population,flags,languages`)
    .then((response) => {
        if (!response.ok) {
        throw new Error(response.status);
        } 
       return response.json()
}).catch(error => {
  console.log(error)
  
})
}
