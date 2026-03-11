# Solat and Weather Hub

A web application that provides accurate prayer times (Waktu Solat) and weather forecasts for various locations across Malaysia.
https://weather-solat-hub.vercel.app/

![Dashboard 1](https://github.com/cxdzy/solat-weather-hub/blob/main/solat-weather-hub/src/assets/Dashboard1.png?raw=true)![Dashboard 2](https://github.com/cxdzy/solat-weather-hub/blob/main/solat-weather-hub/src/assets/Dashboard2.png?raw=true)

## Project Purpose

This project was primarily developed as a practical learning exercise to understand how Application Programming Interfaces (APIs) work. It serves as a real-world implementation of:

* Fetching and handling data from a public API without authentication.
* Securely connecting to an authenticated API using environment variables and API keys.
* Parsing JSON data and managing asynchronous state within a React application.
* Synchronizing data from two different sources based on a single user input (location).

## Features

* **Location-Based Data**: Users can select from a comprehensive list of Malaysian districts and cities.
* **Prayer Times**: Displays daily prayer schedules, including manually calculated Imsak and Dhuha times based on standard local parameters.
* **Weather Forecast**: Integrates current weather conditions and a 7-day weather forecast, including temperature, wind speed, and humidity.
* **Responsive Design**: The interface is fully responsive and adapts to mobile, tablet, and desktop screens.

## Technologies Used

* React (Vite)
* Tailwind CSS for styling
* Lucide React for iconography
* Vercel Analytics for traffic monitoring

## APIs Integrated

1. [**Waktu Solat API**](https://api.waktusolat.app) - Used to retrieve official JAKIM prayer time zones and schedules.
2. [**WeatherAPI**](https://www.weatherapi.com) - Used to retrieve real-time weather and forecast data.

## Running the Project Locally

If you wish to run this project on your local machine, please follow these steps:

1. Clone this repository.
2. Open your terminal and run `npm install` to install the required dependencies.
3. Obtain a free API key from [WeatherAPI.com](https://www.weatherapi.com).
4. Create a `.env` file in the root directory of the project and add your API key:
   `VITE_WEATHER_API_KEY=your_api_key_here`
5. Run `npm run dev` to start the local development server.