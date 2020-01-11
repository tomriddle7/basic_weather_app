const body = document.querySelector("body");
const weather = document.querySelector(".js-weather");

const API_KEY = "d5d4e22204333ea33d6a7c1529fc8c48";
const COORDS = 'coords';

function getWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} @ ${place}`;
			const main = json.weather[0].main;
			imgNumber = 0;
			switch(main) {
				case "Clear":
					imgNumber = 1;
					break;
				case "Clouds":
					imgNumber = 2;
					break;
				case "Rain":
					imgNumber = 1;
					break;
				case "Thunderstorm":
					imgNumber = 1;
					break;
				case "Snow":
					imgNumber = 3;
					break;
				case "Drizzle":
					imgNumber = 1;
					break;
			}
			const image = new Image();
			image.src = `images/${imgNumber}.jpg`;
			image.classList.add("bgImage");
			body.prepend(image);
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
}

function handleGeoError() {
	console.log("Can't access geolocation");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
	askForCoords();
}

function init() {
	loadCoords();
}

init();
