import React, { useEffect, useRef, useState } from 'react';
import './Weather.css'


const Weather = () => {
   const inputRef= useRef()
   const[weatherData, setWeatherData]= useState(false);
   const allIcons= {
    "01d":`https://openweathermap.org/img/wn/01d@2x.png`,
    "02d":`https://openweathermap.org/img/wn/02d@2x.png`,
    "03d":`https://openweathermap.org/img/wn/03d@2x.png`,
    "04d":`https://openweathermap.org/img/wn/04d@2x.png`,
    "09d":`https://openweathermap.org/img/wn/09d@2x.png`,
    "10d":`https://openweathermap.org/img/wn/10d@2x.png`,
    "11d":`https://openweathermap.org/img/wn/11d@2x.png`,
    "13d":`https://openweathermap.org/img/wn/13d@2x.png`,
    "50d":`https://openweathermap.org/img/wn/50d@2x.png`,
    
   }
   
   const search= async(city)=>{
    if (city===""){
      alert("Enter city name");
      return;
    }
    try {
      const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response= await fetch(url);
        const data= await response.json();
        if(!response.ok){
          alert(data.message);
          return;

        }
        console.log(data);
        const icon= allIcons[data.weather[0].icon] || "01d"; 
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data")
      
    }
   }
   useEffect(()=>{
    search("London");
   }, [])     
     
      
      

  return (
    <div className='weather'>
        <div className="search-bar">
            <input  ref={inputRef} type="text" placeholder='Search' />
            <img src="https://t3.ftcdn.net/jpg/01/05/18/78/360_F_105187826_f9QmMttoqksCW1abMmDCAv8q2u265Saa.jpg" alt="" onClick={()=>search(inputRef.current.value)} width={43} height={43}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon'   />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/024/984/141/small/3d-weather-forecast-icon-raindrops-air-humidity-percentage-3d-illustration-png.png" alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src="https://cdn-icons-png.flaticon.com/512/3104/3104631.png" alt="" />
            <div>
              <p>{weatherData.windSpeed} km/hr</p>
              <span>wind-speed</span>
            </div>
          </div>

        </div>
        </>:<></>}
       
        
      
    </div>
  );
}

export default Weather;
