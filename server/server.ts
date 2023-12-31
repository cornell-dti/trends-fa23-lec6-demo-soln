import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { WeatherResponse, WeatherData } from "../common/types";
import fetch from "node-fetch";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  console.log("GET /api/weather was called");
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.7411&longitude=73.9897&current=precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York&forecast_days=1",
    );
    const data = (await response.json()) as WeatherData;
    const output: WeatherResponse = {
      raining: data.current.precipitation > 0.5,
    };
    res.status(200).json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
