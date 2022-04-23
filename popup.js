// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

//http://api.openweathermap.org/geo/1.0/direct?q=charlottesville&limit=5&appid= 05a35824d0c653d00ba7ae131758c581

// Threat-model
let cityInput = document.getElementById("search");
let submitBtn = document.getElementById("submit");
let result    = document.getElementById("result");
const APIKEY = "05a35824d0c653d00ba7ae131758c581"

const _getGeoData = async (city, callback) => {
  let geoData  = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${APIKEY}`);
  //use string literals
  let geoJson = await geoData.json();
  return geoJson;
 }

const _getWeatherData = async (lat, lon, callback) => {
  let weatherJson = await weather.json();
}

submitBtn.addEventListener("click", async function(event) {
  //let city = cityInput.value;
  //city = "charlottesville";
  let city = "Charlottesville";
  let message = await getDomainCookies();

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=5&appid=${APIKEY}`)
  .then(response => response.json())
  .then(geoData => {
    let lat = geoData[0]["lat"];
    let lon = geoData[0]["lon"];
    city = geoData[0]["name"];

    console.log(geoData);
    console.log(lat);
    console.log(lon);
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
    .then(response => response.json())
    .then(weatherData => {
      console.log(weatherData);
      let result = document.getElementById('result');
      let temperature = (weatherData["main"]["temp"] - 273.15).toPrecision(2);
      let weather = weatherData["weather"][0];
      result.innerHTML = `<p>
      ${city}, US<br>
      Current temperature: ${temperature} &#8451;<br>
      Weather: ${weather["main"]}<br>
      Description: ${weather["description"]}<br>
      </p>
      `;
    });
  });
});

async function getDomainCookies() {
  try {
    const cookies = await chrome.cookies.getAll({},
      function (result) {
        console.log(result);
      });
    // console.log(cookies);
    // cookies[0]["tabIds"].forEach(async function(element) {
    //   console.log(element);
    //   cookie = await chrome.cookies.getAll({element});
    //   console.log(cookie);
    // });

    if (cookies.length === 0) {
      return "No cookies found";
    }

  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }

  return `Get some cookie(s).`;
}

cityInput.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    submitBtn.click();
  }
});

function searchCity() {
}