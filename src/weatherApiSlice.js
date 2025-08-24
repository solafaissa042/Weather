import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=34.8021&lon=38.9968&appid=71f8798cfac73dcce5a2a913bb0a31d9"
    );

    const resTemp = Math.round(response.data.main.temp - 272.15);
    const resTempMin = Math.round(response.data.main.temp_min - 272.15);
    const resTempMax = Math.round(response.data.main.temp_max - 272.15);
    const resTempFeelsLike = Math.round(response.data.main.feels_like - 272.15);
    const humidity = response.data.main.humidity;
    const pressure = Math.round(response.data.main.pressure / 1.333);
    const seaLevel = response.data.main.sea_level;
    const windSpeed = response.data.wind.speed;
    const resDescription = response.data.weather[0].description;
    const resIcon = response.data.weather[0].icon;

    return {
      resTemp,
      resTempMax,
      resTempMin,
      resTempFeelsLike,
      resDescription,
      humidity,
      pressure,
      seaLevel,
      windSpeed,
      resIcon: `https://openweathermap.org/img/wn/${resIcon}@2x.png`,
    };
  }
);

const weatherApiSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        console.log("pending weatherApi/fetchWeather/pending");
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("fulfilled weatherApi/fetchWeather/pending");
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        console.log("rejected weatherApi/fetchWeather/pending");
        state.isLoading = true;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
