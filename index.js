let container = document.querySelector('.countries-container');
let countryData;

const fetchCountry = async () => {
  countryData = await fetch('https://restcountries.com/v3.1/all').then((res) => res.json());
};

const countriesDisplay = async () => {
  await fetchCountry();
  console.log(countryData);

  container.innerHTML = countryData
    .map(
      (country) =>
        `
          <div class='card'>
            <img href='${country.flag}'
            <h2>${country.name.common}</h2>
          </div>
        `
    )
    .join('');
};
console.log(container);
countriesDisplay();
