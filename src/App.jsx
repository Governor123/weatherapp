import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBTypography,
} from "mdbreact";
const API_KEY = process.env.API_KEY_ENV;

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Could not fetch weather data");
      }
      const data = await response.json();
      setWeatherData([...weatherData, data]);
      setCity("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {}, []);

  const handleRemoveCard = (index) => {
    const newWeatherData = [...weatherData];
    newWeatherData.splice(index, 1);
    setWeatherData(newWeatherData);
  };

  return (
    <MDBContainer
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#a4b6ed" }}
    >
      <MDBRow className="h-100">
        <MDBCol md="8" lg="6" xl="4">
          <h1>Weather App</h1>
          <form onSubmit={handleSearch}>
            <MDBInput
              label="Search City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <MDBBtn color="primary" type="submit">
              Search
            </MDBBtn>
          </form>
          {error && (
            <MDBTypography className="text-danger">{error}</MDBTypography>
          )}
          <MDBRow>
            {weatherData.map((data, index) => (
              <MDBCol
                md="4"
                key={data.id}
                className="d-flex justify-content-center"
              >
                <MDBCard className="rounded-3 shadow-sm">
                  {" "}
                  <MDBCardBody>
                    <MDBCardTitle style={{ fontSize: "1rem" }}>
                      {data.name}
                    </MDBCardTitle>
                    <MDBCardText>
                      <img
                        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].main}
                        width="100px"
                      />
                      <MDBTypography
                        tag="h4"
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        Temperature: {Math.round(data.main.temp - 273.15)}°C
                      </MDBTypography>
                      <MDBTypography
                        tag="h4"
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        Weather: {data.weather[0].main}
                      </MDBTypography>
                      <MDBTypography
                        tag="h4"
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        Wind: {data.wind.speed} m/s
                      </MDBTypography>
                      <MDBTypography
                        tag="h4"
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        Humidity: {data.main.humidity}%
                      </MDBTypography>
                    </MDBCardText>
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveCard(index)}
                    >
                      Remove
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
