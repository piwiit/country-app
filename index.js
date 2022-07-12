const container = document.querySelector('.countries-container');
const input = document.querySelector('input[type=range]');

let countriesData;

const fetchcountries = async () => {
  countriesData = await fetch('https://restcountries.com/v3.1/all').then((res) => res.json());

  console.log(countriesData);
};

const countriesDisplay = async () => {
  await fetchcountries();
  countriesData.length = rangeValue.value;

  container.innerHTML = countriesData
    .filter((countrie) =>
      countrie.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
    .map(
      (countrie) =>
        `
          <div class='card'>
            <img src='${countrie.flags.svg}'>
            <h2>${countrie.translations.fra.common}</h2>
            <h3>${countrie.capital}</h3>
            <p>Population : ${countrie.population.toLocaleString()} habitants</p>            
          </div>
        `
    )
    .join('');
};

input.addEventListener('change', () => countriesDisplay());
inputSearch.addEventListener('input', () => countriesDisplay());

countriesDisplay();
