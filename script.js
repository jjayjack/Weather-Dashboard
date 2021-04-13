var key = 'a4b00bad833f4e991e075f77de4479fd';
var cityName = document.getElementById('cityName').value;
var currentUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=${key}`;
var openUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=a4b00bad833f4e991e075f77de4479fd';
var previousCity = [];
var cityButton = document.getElementById('search');

function getApi(){
    fetch(currentUrl)
        .then(function(getloc) {
            return getloc.json();
        })
        .then(function(data){
            console.log('Weather');
        })
}

cityButton.addEventListener('click', getApi);

