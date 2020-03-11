window.addEventListener('load', () => {
  let lat, lng;
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureSection = document.querySelector('.temperature-section');
  let temperatureSpan = document.querySelector('.temperature-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/b2b0548e87b00b449318dffc090ff55a/${lat},${lng}`;

      fetch(api).then((response) => (
        response.json()
      )).then((data) => {
        console.log(data);
        const { temperature, summary, icon } = data.currently;
        // Set DOM Elements from the API
        locationTimezone.textContent = data.timezone;
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        // Formular for celsius
        let celsius = ((temperature - 32) * (5 / 9)).toFixed(2);
        // Set Icon
        setIcons(icon, document.querySelector('.icon'));
        // Change temperature to Celsius/Farenheit
        temperatureSection.addEventListener('click', () => {
          console.log(temperatureSpan.textContent);
          if (temperatureSpan.textContent === 'F') {
            temperatureDegree.textContent = celsius;
            temperatureSpan.textContent = 'C';
          } else {
            temperatureDegree.textContent = temperature;
            temperatureSpan.textContent = 'F';
          }
        });
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
