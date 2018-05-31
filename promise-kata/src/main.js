var consoleLoggingEnabled = true;

//weatherService functions:

//getCurrentWeather(zipCode);
//getForecast(zipCode);
//getForecastForDays(zipCode, 5);

function getCurrentWeather(zipCode){	
	var promise = weatherService.getCurrentWeather(zipCode);
	return promise.done(function (weatherData) {
		logTemperature(weatherData);
		logWeatherConditions(weatherData);
		return weatherData;
	}).fail(function (error) { 
		logError(error);
	}).always(function () { 
		//do something;
	});
}

function getWeatherForecast(zipCode){	
	var promise = weatherService.getForecast(zipCode);
	return promise.done(function (weatherData) {
		logWeatherForecast(weatherData);	
		return weatherData;	
	}).fail(function (error) { 
		logError(error);
	}).always(function () { 
		//do something;
	});
}

function getWeatherForecastForDays(zipCode, days){	
	var promise = weatherService.getForecastForDays(zipCode, days);
	return promise.done(function (weatherData) {
		logWeatherForecast(weatherData);	
		return weatherData;	
	}).fail(function (error) { 
		logError(error);
	}).always(function () { 
		//do something;
	});
} 

function getWarmestTemp(zipCodes) {
	var currentTemps = [];
	var promises = [];
		
	zipCodes.forEach(function(zipCode) {
		promises.push(weatherService.getCurrentWeather(zipCode));
	});
	
	var warmestTemp = 0;
	return Promise.all(promises).then(function(weatherForZipCodes) {				
		weatherForZipCodes.forEach(function(weatherForZipCode) {
			if (weatherForZipCode.main.temp > warmestTemp)
				warmestTemp = weatherForZipCode.main.temp;
		});
		
		return warmestTemp;
	});	
}

function getCurrentWeatherAndForecast(zipCode) {
	var conditionAndForecasts = [];
	var currentCondition;
	var cityName;

	var weatherPromises = [];
	var forecastPromises = [];
	
	//queue up service call for weather
	var weatherPromise = weatherService.getCurrentWeather(zipCode);
	return weatherPromise.then(function (weatherForZipCode) {

		currentCondition = weatherForZipCode.main.temp;			
		cityName = weatherForZipCode.name;

		var forecastPromise = weatherService.getForecast(zipCode);
			
		var cityForecasts = [];				
		return forecastPromise.then(function (forecastData) {	
			forecastData.list.forEach(function(interval) {
				cityForecasts.push(interval.dt_txt + ' - ' + interval.main.temp);
			});

			conditionAndForecasts.push(cityName, currentCondition, cityForecasts);
			return conditionAndForecasts;
		}).fail(function (error) { 
			logError(error);
		}).always(function () { 
			//do something;
		});


	}).fail(function (error) { 
		logError(error);
	}).always(function () { 
		//do something;
	});
}

function logTemperature(weatherData){
	if (weatherData !== null) {
		logToConsole("The current temp in " + weatherData.name + " is: " + weatherData.main.temp);
	}
}

function logWeatherConditions(weatherData){
	if (weatherData !== null) {		
		logToConsole("Current conditions:");		
		weatherData.weather.forEach(function(condition) {
			logToConsole(condition.description)
		});
	}
}

function logWeatherForecast(weatherData){
	if (weatherData !== null) {		
		logToConsole("Temperature forecast:");		
		weatherData.list.forEach(function(interval) {
			logToConsole('@ ' + interval.dt_txt + ' - ' + interval.main.temp)
		});
	}
}

function logError(error) {	
	logToConsole("The following error has occurred: " + error);
}

function logToConsole(message) {
	if (consoleLoggingEnabled)
		console.log(message);
	return true;
}