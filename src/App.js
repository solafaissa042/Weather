import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeResult } from "./weatherApiSlice";
import { fetchWeather } from "./weatherApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
moment.locale("ar");

function App() {
  console.log("rendering");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.weather.isLoading);
  const {
    resTemp,
    resTempMax,
    resTempMin,
    resDescription,
    resIcon,
    resTempFeelsLike,
    humidity,
    pressure,
    seaLevel,
    windSpeed,
  } = useSelector((state) => state.weather.weather);
  const { t, i18n } = useTranslation();

  const [dateAndTime, setDateAndTime] = useState(null);
  const [lang, setLang] = useState("ar");

  const handleLanguageClick = () => {
    if (lang === "en") {
      setLang("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLang("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  };

  useEffect(() => {
    dispatch(changeResult());
    i18n.changeLanguage(lang);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    console.log("fetching");
    dispatch(fetchWeather());
  }, []);

  return (
    <div className="App">
      <Container maxWidth="md">
        {/* content container */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "50px",
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {/* card */}

          {/* content */}
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            style={{
              background: "rgba(248, 249, 250,25%)",
              width: "100%",
              color: "white",
              padding: "10px",
              borderRadius: lang === "ar" ? "0px 15px" : "15px 00px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05) ",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
              }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <Typography
                variant="h2"
                style={{ fontWeight: "600", marginRight: "20px" }}
              >
                {t("syria")}
              </Typography>
              <Typography variant="h5" style={{ marginRight: "20px" }}>
                {dateAndTime}
              </Typography>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                  <Typography variant="h1" style={{ textAlign: "right" }}>
                    {resTemp}
                  </Typography>
                  <img src={resIcon} alt="weatherIcon" />
                </div>
                <Typography variant="h6"> {t(resDescription)}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("min")}: {resTempMin}C
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("max")} :{resTempMax}C
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("feels Like")}: {resTempFeelsLike}C
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("humidity")}: {humidity}%
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("pressure")}: {pressure}mmHg
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("sea level")}: {seaLevel}
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5 style={{ margin: "0px 5px" }}>
                    {t("wind speed")}: {windSpeed}m/s
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleLanguageClick}
              variant="text"
              style={{ color: "white" }}
            >
              {lang === "ar" ? "انجليزي" : "Arabic"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
