import { useEffect, useState } from "react";
import { WeatherForecast } from "./types";
import "./App.css";

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [forecasts2, setForecasts2] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ONE_URL}/WeatherForecast`)
      .then((response) => response.json())
      .then((data) => {
        setForecasts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_TWO_URL}/WeatherForecast`)
      .then((response) => response.json())
      .then((data) => {
        setForecasts2(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);


  if (loading) return <div>Loading...</div>;

  return (
    <div>
    <div className="App">
      <h1>Weather Forecast</h1>
      <table>
        <thead>
          {" "}
          {forecasts.length < 1 ? (
            <tr>
              <h1>No data available</h1>
            </tr>
          ) : (
            <tr>
              <th>Date</th>
              <th>Temp. (C)</th>
              <th>Temp. (F)</th>
              <th>Summary</th>
            </tr>
          )}
        </thead>
        <tbody>
          {forecasts.map((forecast, index) => (
            <tr key={index}>
              <td>{new Date(forecast.date).toLocaleDateString()}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="App">
      <h1>Weather Forecast 2 nè</h1>
      <table>
        <thead>
          {" "}
          {forecasts2.length < 1 ? (
            <tr>
              <h1>No data available 2</h1>
            </tr>
          ) : (
            <tr>
              <th>Date 2</th>
              <th>Temp2. (C)</th>
              <th>Temp2. (F)</th>
              <th>Summary2</th>
            </tr>
          )}
        </thead>
        <tbody>
          {forecasts2.map((forecast, index) => (
            <tr key={index}>
              <td>{new Date(forecast.date).toLocaleDateString()}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
