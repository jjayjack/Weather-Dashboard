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
                        }
                    )
            }
        )
};

cityButton.addEventListener('click', getCity);

