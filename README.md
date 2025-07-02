


#  Weather app -2 

### 📝 Overview / Introduction

Classy Weather is a modern and visually polished weather forecasting web application built using React.js. It allows users to search for any city in the world and get current weather conditions along with a 6-day weather forecast in a simple, elegant interface.

This app is designed for both functionality and aesthetics, offering real-time weather updates and dynamically changing visuals based on weather conditions (e.g., clear, cloudy, rainy, snowy). It demonstrates the power of combining React, weather APIs, and CSS to build a responsive and user-centric application.
### Visite Link 

https://classy-halva-0b1569.netlify.app/


### ⚙ Installation
1.  Clone the Repository
Open your terminal and run:
```bash
 git clone https://github.com/kokenydaniel/classy-weather.git

```
Then navigate into the project folder:
```bash
 cd classy-weather


```


2. Install Dependencies
Make sure you have Node.js and npm installed.

Then, install the required packages using:

```bash
  npm install
```
 
3. API Key Setup
This app likely uses the OpenWeatherMap API. You need to create a .env file and include your API key:

Example .env file:

```bash
REACT_APP_API_KEY=your_openweathermap_api_key 
```
⚠️ Replace your_openweathermap_api_key with a valid key from https://openweathermap.org/api

4. Run the App
Start the development server:

```bash
  npm start
```
This will open the app in your default browser at:
```bash
  http://localhost:3000

```

5. Build for Production (Optional)
To build the optimized production version:
```bash
  npm run build
```
### Screenshots

![Front Page](https://github.com/user-attachments/assets/dd0af318-385e-4df3-934c-040f2e1c80b9)

![City Data](https://github.com/user-attachments/assets/5064b211-0e1e-4f70-8417-1efac6cab859)

![Button information](https://github.com/user-attachments/assets/14278fef-14df-4e8a-98c3-4786a9f8fac7)





###  🧠 What You’ll Learn From It

- React fundamentals & component structuring

- API integration & handling async fetch calls

- Dynamic UI updates based on JSON data

- Best practices in modular code organization




### 🛠️ How It Works
1. Search a city

2. App fetches data from the weather API

3. Displays:

- Current temperature, conditions, humidity, wind, etc.

- A dynamic background image matching the weather

- 7‑day forecast with highs/lows

- City name and country

4. Interactive design makes it easy to use and visually pleasing






### 🔑 Core Objectives
- Provide a clean, intuitive interface for weather lookup.

- Deliver accurate real-time weather data using a third-party API (likely OpenWeatherMap).

- Display a 6-day weather forecast to help users plan ahead.

- Offer dynamic visuals that reflect current weather moods.

- Serve as a solid learning project for frontend development with APIs.



### 📌 Note
- 🌐 Internet connection is required to fetch live weather data from the API.

- 🔑 You must provide a valid API key (e.g., from OpenWeatherMap) in the .env file for the app to function properly.

- 📱 The app is responsive, but performance and layout may vary slightly across different devices and screen sizes.

- 🧪 If the weather data fails to load, double-check:

  1. Your API key

  2. City name spelling (case-insensitive)

  3. Network availability

- 🚫 There is no backend — all requests are handled client-side using JavaScript (React fetch).

- 🌙 Some visual weather effects may vary based on API condition codes and time of day (day/night themes).

- 🛠 For educational/demo purposes. Not intended for commercial deployment without proper error handling and rate-limiting.
