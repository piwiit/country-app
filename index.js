const container = document.querySelector('.countries-container');
let input = document.querySelector('input[type=range]');
console.log(input);

let countriesData;

const fetchcountries = async () => {
  await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
};

const countriesDisplay = async () => {
  await fetchcountries();
  countriesData.length = rangeValue.value;

  container.innerHTML = countriesData
    .map(
      (countrie) =>
        `
          <div class='card'>
            <img src='${countrie.flags.svg}'>
            <h2>${countrie.translations.fra.common}</h2>
            <h3>${countrie.capital}</h3>
            <p>Population : ${countrie.population}</p>            
          </div>
        `
    )
    .join('');
};

input.addEventListener('change', () => countriesDisplay());

countriesDisplay();
