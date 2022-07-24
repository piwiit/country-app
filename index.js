const container = document.querySelector('.countries-container');
const input = document.querySelector('input[type=range]');
let countriesData;

const fetchcountries = async () => {
  countriesData = await fetch('https://restcountries.com/v3.1/all').then((res) => res.json());
  countriesDisplay();
};

const countriesDisplay = (e) => {
  container.innerHTML = countriesData
    .slice(0, e)
    .filter((country) =>
      country.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
    .map(
      (country) =>
        `
          <div class='card'>
            <img src='${country.flags.svg}'>
            <h2>${
              country.translations.fra.common === undefined
                ? 'Pas de capitale'
                : country.translations.fra.common
            }</h2>
            <h3>${country.capital}</h3>
            <p>Population : ${country.population.toLocaleString()} habitants</p>            
          </div>
        `
    )
    .join('');
};

const ascendingSort = () => {
  countriesData.sort((a, b) => a.population - b.population);
};

const descendingSort = () => {
  countriesData.sort((a, b) => b.population - a.population);
};

const alphabeticalSorting = () => {
  countriesData.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
};

minToMax.addEventListener('click', () => {
  ascendingSort();
  countriesDisplay();
});

maxToMin.addEventListener('click', () => {
  descendingSort();
  countriesDisplay();
});

alpha.addEventListener('click', () => {
  alphabeticalSorting();
  countriesDisplay();
});

input.addEventListener('input', () => {
  let num = parseInt(input.value);
  countriesDisplay(num);
});

inputSearch.addEventListener('input', () => countriesDisplay());

fetchcountries();
