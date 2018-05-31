describe("The weather module", function() {
	var zipCode = '46239';
	
	it('can log to the console', function() {
		var result = logToConsole('this is a test');
		expect(result).toBe(true);
	});
	
    it("can get the current weather given a zipCode", function (done) {
        var promise = getCurrentWeather(zipCode);
        promise.done(function (weatherData) {
			expect(weatherData).not.toBeNull();	 
			expect(weatherData.main).not.toBeNull();	
			expect(weatherData.main.name).not.toBeNull(); 
            done();
        });
    });		
	
    it("can get the weather forecast given a zipCode", function (done) {
        var promise = getWeatherForecast(zipCode);
        promise.done(function (weatherData) {
			expect(weatherData).not.toBeNull();
			expect(weatherData.list).not.toBeNull();	
			expect(weatherData.city.name).not.toBeNull();	
            done();
        });
    });	
	
    it("can get the 5-day weather forecast given a zipCode", function (done) {
        var promise = getWeatherForecastForDays(zipCode, 5);
        promise.done(function (weatherData) {
			expect(weatherData).not.toBeNull();
			expect(weatherData.list).not.toBeNull();	
			expect(weatherData.city.name).not.toBeNull();	
            done();
        });
    });	
    
    it("can get the warmest current temperature given a list of zip codes", function (done) {
		var zipCodes = ['90001','60007','33101','75001','98101'];
		var promise = getWarmestTemp(zipCodes);
        promise.then(function (warmestTemp) {
			expect(warmestTemp).not.toBeUndefined();         
            done();
        });	
    });

    it("can get the current weather and forcast given a list of zip codes", function () {
        var promise =  getCurrentWeatherAndForecast('90001');        
        promise.then(function (conditionAndForecasts) {
             expect(conditionAndForecasts.length).toBeGreaterThan(0);
         }); 
    });    
});	