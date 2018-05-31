# Code Kata - JavaScript Promises

### Level of Difficulty: Easy

## Objectives:
* Understand the basics of JavaScript Promises
* Create a small application to leverage JavaScript Promises
	* Using the openweathermap.org API, display information about the weather
	* Handling multiple promises
	* Implement “Callback” methods
	* Promise chaining
	* Unit Testing with Karma / Jasmine
 
## Getting Started
* **Repo:** https://bitbucket.org/chris_coburn/promise-kata
	* **Clone:** git clone https://chris_coburn@bitbucket.org/chris_coburn/promise-kata.git
* **Software Requirements:**
	* Text Editor (choose one)
		* Notepad
		* Notepad++ - https://notepad-plus-plus.org
		* Sublime Text - https://www.sublimetext.com
	* NodeJS & Node Package Manager (npm) - https://www.npmjs.com/get-npm 
	* Karma / Jasmine (unit testing) - installed automatically below
	
	
### Step-by-step
1. Download and install Node.js & Node Package Manager (npm)
2. Open Command Prompt
3. Navigate to the project folder **(ex: cd C:\workspace\promise-kata)**
4. Execute "**npm -v**" - validate version of Node.js
5. Execute "**npm install**"
6. Execute "**npm test**"

### JavaScript Promise API Reference
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### OpenWeatherMap API Reference
* **URL:** https://openweathermap.org/api
* **API Key - 6eb7b8cafce96454b0377ade86ca9159**
	
---

## Stage 1 - Running Karma + Node JS

* Run/Execute 1st Unit Test


---

## Stage 2 - Basic Promise

### Calling API
* Get city name & current weather - using zip code
	* **service.getCurrentWeather(zipCode)**
* Get city name & forecast
	* **service.getWeatherForecast(zipCode)**
* Get city name & 5-day forecast
	* **service.getWeatherForecastForDays(zipCode, days)**	
### Logging to Response Console
* **ex:** console.log("hello world");

### Implement Callbacks
* **Done**
	* **logToConsole()** - Success
* **Fail**
	* **logToConsole()** - Error Message 
* **Always**
	* **logToConsole()** - Complete

---

## Stage 3 - Multiple Promises - .all()
### Find city with warmest temp
* Zip Codes:
	* 90001
	* 60007
	* 33101
	* 75001
	* 98101
### Hint: Use a Callback Function

---

## Stage 4 - Chaining
* Get Current Condition + 5 Day Forecast
* Zip Code:
	* 90001
