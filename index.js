// access all html need files using DOM

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userWeatherInfo = document.querySelector(".user-info-container");
const grantAccess = document.querySelector("[data-grantAccess]");
const errorTab = document.querySelector("[data-error-container]");

// // define api key
const API_KEY = "aa7ed613ed47d80ac5a2426b64f59683";

// // used variables

let oldTab = userTab;

oldTab.classList.add("current-tab");

getfromSessionStorage();

function swicthTab(newTab) {
  if (newTab != oldTab) {
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      errorTab.classList.remove("active");
      userWeatherInfo.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      userWeatherInfo.classList.remove("active");
      errorTab.classList.remove("active");
      getfromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  // switch Tab
  swicthTab(userTab);
});

searchTab.addEventListener("click", () => {
  // switch tab
  swicthTab(searchTab);
});

function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");

  if (!localCoordinates) {
    grantAccessContainer.classList.add("active");
    loadingScreen.classList.remove("active");
    errorTab.classList.remove("active");
    userWeatherInfo.classList.remove("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  // grant access screen remove
  grantAccessContainer.classList.remove("active");

  // error tab remove
  errorTab.classList.remove("active");
  // loading screen till API fetch data from server
  loadingScreen.classList.add("active");
  userWeatherInfo.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    loadingScreen.classList.remove("active");
    userWeatherInfo.classList.add("active");
    renderScreenInfo(data);
  } catch (err) {
    // HomeWork
    loadingScreen.classList.remove("active");
    userWeatherInfo.classList.remove("active");
    errorTab.classList.add("active");
  }
}

function renderScreenInfo(weatherInfo) {
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const weatherDesc = document.querySelector("[data-weatherDescription]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const Temp = document.querySelector("[data-temp]");
  const windSpeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const clouds = document.querySelector("[data-cloudiness]");
  //  fetch values from Api Data
  cityName.innerText = weatherInfo?.name;
  let val = weatherInfo?.sys?.country;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  weatherDesc.innerText = weatherInfo?.weather[0]?.description;
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`;
  Temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  clouds.innerText = `${weatherInfo?.clouds?.all}%`;
}

function getLocation() {
  if (navigator.geolocation) {
    errorTab.classList.remove("active");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // HomeWork
    loadingScreen.classList.remove("active");
    userWeatherInfo.classList.remove("active");
    errorTab.classList.add("active");
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

grantAccess.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName === "") return;
  else fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userWeatherInfo.classList.remove("active");
  errorTab.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    loadingScreen.classList.remove("active");
    userWeatherInfo.classList.add("active");
    renderScreenInfo(data);
  } catch (err) {
    // HomeWork
    loadingScreen.classList.remove("active");
    userWeatherInfo.classList.remove("active");
    errorTab.classList.add("active");
  }
}



// Trying to fetch API data

// console.log("hey hey boy");
// console.log("it's not working");

// const API_KEY = "aa7ed613ed47d80ac5a2426b64f59683";

// async function showWeather() {
//   try {
//     let city = "Connaught Place";
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );
//     const data = await response.json();
//     console.log("data is here:->", data);
//     let newPara1 = document.createElement("p");
//     let newPara2 = document.createElement("p");
//     newPara1.textContent = "the temp. is" + `${data?.main?.temp} celcius`;
//     newPara2.textContent =
//       "the pressure is " + `${data?.main?.pressure} pascal`;

//     document.body.appendChild(newPara1);
//     document.body.appendChild(newPara2);
//   } catch (err) {
//     console.log("wrong city name");
//   }
// }

// async function getWeatherData() {
//   try {
//     let latitude = 29.86523292094889;
//     let longitude = 77.89492851525296;
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//     );
//     let data = await response.json();

//     console.log("data fetched :> ", data);
//     let para1 = document.createElement("p");
//     let para2 = document.createElement("p");
//     para1.textContent = "the temperature is " + `${data?.main?.temp} celcius`;
//     para2.textContent = "the name is" + `${data?.name}`;
//     document.body.appendChild(para1);
//     document.body.appendChild(para2);
//   } catch (err) {
//     console.log("Data not found for this coordinates");
//   }
// }

// // function to get your location

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showLocation);
//   } else {
//     console.log("no geolocation support");
//   }
// }

// function showLocation(position) {
//   const lat = position.coords.latitude;
//   const longi = position.coords.longitude;
//   console.log(lat);
//   console.log(longi);
// }
