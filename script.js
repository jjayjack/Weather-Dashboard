var key = 'a4b00bad833f4e991e075f77de4479fd';
var previousCity = [];
var cityButton = document.getElementById('search');
var cityName1HTML = document.getElementById('cityName1');
var currentDateHTML = document.getElementById('currentDate');
var weatherHTML = document.getElementById('weatherIcon');
var tempHTML = document.getElementById('temp');
var humidHTML = document.getElementById('humid');
var windHTML = document.getElementById('wind');
var uvHTML = document.getElementById('uv');



function getCity(){
    var cityName = document.getElementById('cityName').value;
    var currentUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${key}`;
  
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
                            var date = document.createElement('h4');
                            var weatherImg = document.createElement('img');
                            var iconW = `http://openweathermap.org/img/wn/${allweatherData.daily[0].weather[0].icon}@2x.png`;
                            var temp = document.createElement('h4');
                            var humid = document.createElement('h4');
                            var wind = document.createElement('h4');
                            var uv = document.createElement('h4');
                            uv.id = 'uvColor';
                                cityName1.textContent = data.city.name;
                                date.textContent = moment.unix(allweatherData.daily[0].dt).format("MM/DD/YYYY");
                                weatherImg.src = iconW;
                                temp.textContent = allweatherData.daily[0].temp.day;
                                humid.textContent = allweatherData.daily[0].humidity;
                                wind.textContent = allweatherData.daily[0].wind_speed;
                                uv.textContent = allweatherData.daily[0].uvi;
                            if (allweatherData.daily[0].uvi <= 2){
                                uv.style.backgroundColor = 'green';
                            }else if (allweatherData.daily[0].uvi >= 2 && allweatherData.daily[0].uvi <= 5){
                                uv.style.backgroundColor = 'yellow';
                            }else if (allweatherData.daily[0].uvi >= 5 && allweatherData.daily[0].uvi <= 7){
                                uv.style.backgroundColor = 'orange';
                            }else if (allweatherData.daily[0].uvi >= 7 && allweatherData.daily[0].uvi <= 10){
                                uv.style.backgroundColor = 'red';
                            }else{
                                uv.style.backgroundColor = 'purple';
                            }                        
                                //append child
                                cityName1HTML.appendChild(cityName1);
                                currentDateHTML.appendChild(date);
                                weatherHTML.appendChild(weatherImg);
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
    save();
};

function save(){
    input = document.getElementById('cityName').value;
    previousCity.push(input);
    localStorage.setItem('cityValue', JSON.stringify(previousCity));
    //make previous city link
    // var lastCity = document.querySelector(input);
    // lastCity.addEventListener('click', function(){
    //     getCity;
    // })
    // cityName.setAttribute('a','a');
};

cityButton.addEventListener('click', getCity);

previousCity = JSON.parse(localStorage.getItem('cityValue'));

if(previousCity !== null){
    var cityList = document.createElement('ul');
    var previousCities = document.getElementById('searchField');
    previousCities.appendChild(cityList);


    var i;
    for (i = 0; i < previousCity.length; i++){
    // loop in order to add each value within previous city array to list
    var storedCity = document.createElement('li');
    cityList.appendChild(storedCity);
    storedCity.innerHTML = previousCity[i];

    }
}else{
    previousCity = [];
};
