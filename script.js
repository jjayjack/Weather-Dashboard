var key = 'a4b00bad833f4e991e075f77de4479fd';
var previousCity = [];
var cityButton = document.getElementById('search');
var cityName1HTML = document.getElementById('cityName1');
var tempHTML = document.getElementById('temp');
var humidHTML = document.getElementById('humid');
var windHTML = document.getElementById('wind');
var uvHTML = document.getElementById('uv');


function getCity(){
    var cityName = document.getElementById('cityName').value;
    var currentUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${key}`;
  
    var units = '&units=imperial';
    fetch(currentUrl)
        .then(function(rawData) {
            return rawData.json();
        }
        )
        .then(function(data)
            {
                var openUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&units=imperial&appid=${key}`;
                
                fetch(openUrl) 
                    .then(function(weatherData) {
                            return weatherData.json();
                    }
                    )
                    .then(function(allweatherData)
                        {
                            var cityName1 = document.createElement('h3');
                            var temp = document.createElement('h4');
                            var humid = document.createElement('h4');
                            var wind = document.createElement('h4');
                            var uv = document.createElement('h4');
                                cityName1.textContent = data.city.name;
                                temp.textContent = allweatherData.daily[0].temp.day;
                                humid.textContent = allweatherData.daily[0].humidity;
                                wind.textContent = allweatherData.daily[0].wind_speed;
                                uv.textContent = allweatherData.daily[0].uvi;

                                //append child
                                cityName1HTML.appendChild(cityName1);
                                tempHTML.appendChild(temp);
                                humidHTML.appendChild(humid);
                                windHTML.appendChild(wind);
                                uvHTML.appendChild(uv);

                                //for loop for remainder of days 
                                var i;
                                for (i = 0; i < 5; i++) {
                                    var dateForecast = document.createElement('h4')
                                    var graphicIcon = document.createElement('img')
                                    var tempForecast = document.createElement('p');
                                    var humidForecast = document.createElement('p');
                                    var weatherIcon = `http://openweathermap.org/img/wn/${allweatherData.daily[i].weather[0].icon}@2x.png`;
                                    var dateStamp = moment.unix(allweatherData.daily[i].dt).format("MM/DD/YYYY");
                                

                                    dateForecast.textContent = dateStamp;
                                    graphicIcon.src = weatherIcon;
                                    tempForecast.textContent = "Temperature: " + allweatherData.daily[i].temp.day;
                                    humidForecast.textContent = "Humidity: " + allweatherData.daily[i].humidity;

                                    var boxCard = document.createElement('div');
                                    var dayCard = document.createElement('card');
                                    boxCard.className = "forecastDiv"
                                    dayCard.className = "forecastCard";
                                    document.getElementById("forecast").appendChild(boxCard);
                                    boxCard.appendChild(dayCard);
                                    dayCard.appendChild(dateForecast);
                                    dayCard.appendChild(graphicIcon);
                                    dayCard.appendChild(tempForecast);
                                    dayCard.appendChild(humidForecast);

                                }
                        }
                    )
            }
        )
};

cityButton.addEventListener('click', getCity);

