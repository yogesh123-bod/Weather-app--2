const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');
const forecastItemContainer = document.querySelector('.forecast-item-container');
const moreBtn = document.querySelector('.more-btn');
const moreMenu = document.querySelector('.more-menu');

let currentUnit = 'metric';
const unitButtons = document.querySelectorAll('.unit-btn');

weatherSummaryImg.onerror = () => {
  console.error('Failed to load image:', weatherSummaryImg.src);
  weatherSummaryImg.src = 'https://openweathermap.org/img/wn/02d@2x.png'; // Fallback to clouds
};

const apiKey = 'c61999f93dc38fc7c20ae5632d4f41ed';

searchBtn.addEventListener('click', () => {
  if (cityInput.value.trim() !== '') {
    const city = cityInput.value.trim();
    updateWeatherInfo(city);
    cityInput.value = '';
    cityInput.blur();
  }
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && cityInput.value.trim() !== '') {
    const city = cityInput.value.trim();
    updateWeatherInfo(city);
    cityInput.value = '';
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city, lat = null, lon = null) {
  let url;
  if (endPoint === 'weather' && lat !== null && lon !== null) {
    url = `https://api.openweathermap.org/data/2.5/${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { cod: 'error', message: error.message };
  }
}

async function updateWeatherInfo(city, lat = null, lon = null) {
  document.querySelector('.loading').classList.remove('hidden');

  console.log('Searching city:', city || `Lat: ${lat}, Lon: ${lon}`);

  const data = await getFetchData('weather', city, lat, lon);
  console.log('Raw API response:', data);

  if (data.cod !== 200) {
    document.querySelector('.loading').classList.add('hidden');
    console.warn('City not found or error:', data.message);
    showDisplaySection(notFoundSection);
    return;
  }

  const {
    name,
    main: { temp, humidity },
    weather,
    wind: { speed }
  } = data;

  const weatherId = weather[0].id;
  const weatherMain = weather[0].main;
  const iconCode = weather[0].icon || '02d';
  const tempUnit = currentUnit === 'metric' ? '°C' : '°F';
  const windUnit = currentUnit === 'metric' ? 'm/s' : 'mph';

  console.log('City:', name);
  console.log('Weather ID:', weatherId);
  console.log('Weather Main:', weatherMain);
  console.log('Icon Code:', iconCode);
  console.log('Selected Icon Path:', getWeatherIcon(weatherId, iconCode));

  countryTxt.textContent = name;
  tempTxt.textContent = `${Math.round(temp)} ${tempUnit}`;
  conditionTxt.textContent = weatherMain;
  humidityValueTxt.textContent = `${humidity}%`;
  windValueTxt.textContent = `${speed} ${windUnit}`;
  currentDateTxt.textContent = getCurrentDate();
  weatherSummaryImg.src = ''; // Reset src to force reload
  weatherSummaryImg.src = getWeatherIcon(weatherId, iconCode);

  await updateForecastsInfo(city, lat, lon);
  document.querySelector('.loading').classList.add('hidden');

  showDisplaySection(weatherInfoSection);
}

async function updateForecastsInfo(city, lat = null, lon = null) {
  const forecastData = await getFetchData('forecast', city, lat, lon);
  const targetTime = '12:00:00';
  const today = new Date().toISOString().split('T')[0];
  const tempUnit = currentUnit === 'metric' ? '°C' : '°F';

  forecastItemContainer.innerHTML = '';

  if (forecastData.cod !== '200') {
    console.warn('Forecast error:', forecastData.message);
    return;
  }

  forecastData.list.forEach(forecast => {
    if (
      forecast.dt_txt.includes(targetTime) &&
      !forecast.dt_txt.includes(today)
    ) {
      const {
        dt_txt: date,
        weather: [{ id, icon }],
        main: { temp }
      } = forecast;

      const dateObj = new Date(date);
      const dateStr = dateObj.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short'
      });

      const iconCode = icon || '02d';
      console.log('Forecast Date:', dateStr, 'Icon Code:', iconCode);

      const html = `
        <div class="forecast-item">
          <h5 class="forecast-item-date regular-txt">${dateStr}</h5>
          <img src="${getWeatherIcon(id, iconCode)}" class="forecast-item-img" onerror="this.src='https://openweathermap.org/img/wn/02d@2x.png'; console.error('Failed to load forecast image:', this.src)" />
          <h5 class="forecast-item-temp">${Math.round(temp)} ${tempUnit}</h5>
        </div>
      `;
      forecastItemContainer.insertAdjacentHTML('beforeend', html);
    }
  });
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(s => {
    s.style.display = 'none';
  });
  section.style.display = 'flex';
}

function getWeatherIcon(id, iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getCurrentDate() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });
}

// Dark mode toggle
const darkToggleBtn = document.querySelector('.dark-toggle');
darkToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Voice search
const micBtn = document.querySelector('.mic-btn');
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognition) {
  const mic = new recognition();
  mic.lang = 'en-US';
  mic.interimResults = false;

  micBtn.addEventListener('click', () => {
    mic.start();
  });

  mic.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    cityInput.value = transcript;
    updateWeatherInfo(transcript);
  };

  mic.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    alert('Speech recognition failed. Please try again.');
  };
} else {
  micBtn.style.display = 'none';
  console.warn('Speech recognition not supported.');
}

// Location-based weather
const locationBtn = document.querySelector('.location-btn');
locationBtn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      await updateWeatherInfo(null, lat, lon);
    }, (err) => {
      console.error('Geolocation error:', err);
      alert('Location access denied.');
    });
  } else {
    alert('Geolocation not supported.');
  }
});

moreBtn.addEventListener('click', () => {
  moreMenu.classList.toggle('hidden');
});

// Close menu if clicked outside
document.addEventListener('click', (e) => {
  if (!moreBtn.contains(e.target) && !moreMenu.contains(e.target)) {
    moreMenu.classList.add('hidden');
  }
});

unitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    unitButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentUnit = btn.dataset.unit;
    if (countryTxt.textContent !== 'City') {
      updateWeatherInfo(countryTxt.textContent);
    }
  });
});