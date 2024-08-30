# Weather App

## Deployment
https://weather-app-flax-psi-10.vercel.app/

## Description

The Weather App is a React-based application that provides weather forecasts and current weather conditions for any city. Users can also get weather information based on their current location. The app includes a modal with information about the Product Manager Accelerator Program.

## Features

- **Current Weather**: Fetches and displays the current weather for a given city or user's location.
- **5-Day Forecast**: Provides a detailed 5-day weather forecast.
- **Modal Info**: Displays information about the Product Manager Accelerator Program.
- **Loading Spinner**: Indicates when data is being fetched.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd weather-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

4. **Create a `.env` file in the root directory and add your API key:**

    ```env
    REACT_APP_API_KEY=your_openweathermap_api_key
    ```

5. **Start the development server:**

    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

6. **Open your browser and navigate to `http://localhost:3000` to view the app.**

## Usage

- **Enter a city name** in the input field and click "Get Weather" to fetch the current weather and 5-day forecast for that city.
- **Click "Use My Location"** to fetch weather data based on your current location.
- **Click the "Info" button** to open a modal with information about the Product Manager Accelerator Program.

## Components

- **WeatherApp**: Main component that manages the state and logic for fetching and displaying weather data.
- **LoadingSpinner**: Displays a spinner during data fetching.
- **Modal**: Displays information about the Product Manager Accelerator Program.

## Environment Variables

- **REACT_APP_API_KEY**: Your API key for the OpenWeatherMap API. Get your API key from [OpenWeatherMap](https://openweathermap.org/api).

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- [React](https://reactjs.org/) for building the user interface.
