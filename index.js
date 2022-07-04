let countryData = [];

const fetchCountry = async (search) => {
  if (search === '') {
    await fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => (countryData = data));
  } else {
    await fetch('https://restcountries.com/v3.1/name/' + search)
      .then((res) => res.json())
      .then((data) => (countryData = data));
  }
  console.log(countryData);
};

inputSearch.addEventListener('input', (e) => {
  fetchCountry(e.target.value);
});

inputSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchCountry();
});
