const weather = document.querySelector(".js-weather");
const places = document.querySelector(".js-place");

const API_KEY = "1c0c945daafc1ebee8655bd3048b760d";
const COORDS = "coords";

// Weather API 사용
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      // 네트워크에 관한 정보를 찍어봄 console.log(response);
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}º`;
      places.innerText = `in ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표 가져오는데 성공시 사용하는 함수
function handleGeoSuccess(position) {
  // console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // key : value가 같을 때 아래처럼 작성 가능
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

// 좌표 가져오는데 실패시 사용하는 함수
function handleGeoError() {
  console.log("위치 정보를 가져올 수 없습니다.");
}

// 좌표를 요청하는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  // handleGeoSuccess()는 로컬스토리지에 위치정보가 없을 때 실행됨.
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    // console.log(parseCoords.latitude, parseCoords.longitude);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
