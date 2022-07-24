const container = document.querySelector('.countries-container');
const input = document.querySelector('input[type=range]');
let countriesData;

const fetchcountries = async () => {
  countriesData = await fetch('https://restcountries.com/v3.1/all').then((res) => res.json());
  countriesDisplay();
};

const countriesDisplay = () => {
  container.innerHTML = countriesData
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

input.addEventListener('change', () => {
  countriesDisplay();
  console.log(countriesData);
});

inputSearch.addEventListener('input', () => countriesDisplay());

fetchcountries();
