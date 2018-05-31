// weather.js - APIs for openweathermap.org
var weatherService = function () {

	var config = {
		city : 'Indianapolis',
		units : 'imperial',
		lan : 'en',
		format : 'json',
		APPID : '6eb7b8cafce96454b0377ade86ca9159'
	};

	// main settings	
	//var rp = require('request-promise');
	//var http = require('http');
	
	var options = {
		host : 'api.openweathermap.org',
		path: '/data/2.5/weather?q=indianapolis',
		withCredentials: false
	};

	var serviceBaseURL = 'http://api.openweathermap.org';
	var apiKey = '6eb7b8cafce96454b0377ade86ca9159';
	//var weather = exports;

  // weather(set)  --------------------------------------------  weather(set)  ---------------------------------------------
	var setLang = function(lang){
		config.lan = lang.toLowerCase();
	},

	setCity = function(city){
		config.city = encodeURIComponent(city.toLowerCase());
	},

	setCoordinate = function(latitude, longitude){
		config.latitude = latitude;
		config.longitude = longitude;
	},

	setCityId = function(cityid){
		config.cityId = cityid;
	},

	setZipCode = function(zip){
		config.zip = zip;
	},

	setUnits = function(units){
		config.units = units.toLowerCase();
	},

	setAPPID = function(appid){
		config.APPID = appid;
	},

  // weather(get)  ---------------------------------------------  weather(get)  ---------------------------------------------

	getCurrentWeather = function (zipCode)
	{
		setZipCode(zipCode);
		var options = {
			uri: serviceBaseURL + buildPath(),
			json: true // Automatically parses the JSON string in the response
		};	
		return getWeatherData(options)
	},
	
	getForecast = function (zipCode)
	{
		setZipCode(zipCode);
		var options = {
			uri: serviceBaseURL + buildPathForecast(),
			json: true // Automatically parses the JSON string in the response
		};
		return getWeatherData(options, false);
	},
	
	getForecastForDays = function (zipCode, days)
	{
		setZipCode(zipCode);
		var options = {
			uri: serviceBaseURL + buildPathForecastForDays(days),
			json: true // Automatically parses the JSON string in the response
		};
		return getWeatherData(options, false);
	};

  // active functions()  -------------------------------------  active functions()  --------------------------------------------

	function getWeatherData(options){		
		return $.ajax({
			type: "GET",
			url: options.uri,
			dataType: "jsonp"
		}).done(function (results) {
			return results;
		}).fail(function (err) {
			return err;
		}).always(function () {
			//perform some logging?
		});		
	};  
	
	function getErr(callback){
		// set new path to throw the http exception
		options.path = 'timetocrash';
		http.get(options, function(err,data){
			return callback(err,data);
		});
	};

	function getCoordinate(){
		var coordinateAvailable = config.latitude && config.longitude;
		var cityIdAvailable = config.cityId;
		var coordinateQuery = 'q='+config.city;
		if (cityIdAvailable) coordinateQuery = 'id='+config.cityId;
		if (config.zip) coordinateQuery = 'zip='+config.zip;
		else if (coordinateAvailable) coordinateQuery = 'lat='+config.latitude+'&lon='+config.longitude;
		return coordinateQuery;
	};

	function buildPath(){
		return '/data/2.5/weather?' + getCoordinate() + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
	};

	function buildPathForecast(){
		return buildPathForecastForDays(3);
	};

	function buildPathForecastForDays(days){
		var cnt = days * (24/3);		
		return '/data/2.5/forecast?' + getCoordinate() + '&cnt=' + cnt + '&units=' + config.units + '&lang=' + config.lan + '&mode=json&APPID=' + config.APPID;
	};
	
	
    return {
        getCurrentWeather: getCurrentWeather,
        getForecast: getForecast,
        getForecastForDays: getForecastForDays,
        setCoordinate: setCoordinate
    };
	
}();