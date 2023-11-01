import { useEffect, useState } from "react";
import { WeatherResponse } from "../../../common/types";

const getWeather = (): Promise<WeatherResponse> =>
  fetch(`http://localhost:8080/api/weather`).then((res) => res.json());

const Weather = () => {
  const [{ raining }, setRaining] = useState<WeatherResponse>({
    raining: false,
  });

  useEffect(() => {
    console.log("Loading weather...");
    getWeather().then((data) => {
      console.log(data);
      setRaining(data);
    });
  }, []);

  return (
    <div>
      <h1>Is it raining in New York?</h1>
      <p>{raining ? "Yes" : "No"}</p>
    </div>
  );
};

export default Weather;
