import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion"

const Weather = () => {

    const [ weatherData, setWeatherData ] = useState ("");
    const [ location, setLocation ] = useState ('Berlin');
    const [icon, setIcon ] = useState ('')

    const apiSearch = () => { 

        const api = {
            key: "c33606fb194e61c82ababcb0fcc82128",
            base : "https://api.openweathermap.org/data/2.5/",
        }
        axios.get(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`).then((data)=>{
            setWeatherData(data.data)
            setIcon(`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`)
            console.log(data);
        })
    }

    useEffect(() => {
        apiSearch();
    },[])



    return (
        <div className="maindiv">
            <input type="text" placeholder="City Name..." value={location}
            onKeyPress={(e)=>{
                if(e.code === 'Enter')
                {
                    apiSearch();
                }
            }}
            onChange={(e)=>{
                setLocation(e.target.value);
            }}
            ></input>
            
            <div className="weather-info">
            {
                weatherData !== ""?

            <>
                <h1>{weatherData.name}</h1>

                <motion.div className="maindiv2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                >

                <div className="weather-temp">
                    <div className="div-info1">
                        <span className="info1">{Math.floor(weatherData.main.temp)}°<span className="icon1"><img src={icon}/></span></span>
                        <span className="info4">Feels Like: {Math.floor(weatherData.main.feels_like)}°</span>
                        </div>
                        <br/>
                    
                    <div className="div-info2">
                        <span className="info2"> Max: {Math.floor(weatherData.main.temp_max)}°</span>
                        <span className="info3">Min: {Math.floor(weatherData.main.temp_min)}°</span>
                    </div>
                    

                </div>

                <div className="weather-wind">
                    <span className="info5" >{Math.floor(weatherData.wind.deg)}<span className="icon"></span>&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/nolan/40/windsock.png"/></span>
                    <span className="info5">{Math.floor(weatherData.wind.speed)}<span>&nbsp;&nbsp;</span><img src="https://img.icons8.com/nolan/40/wind.png"/></span>
                </div>

                <div className="weather-wind2">
                    <span className="info6" >{Math.floor(weatherData.main.pressure)}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/50/000000/external-barometer-physics-icongeek26-outline-gradient-icongeek26.png"/></span></span>
                    <span className="info6" >{weatherData.weather[0].description.toUpperCase()}<span>&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/nolan/60/partly-cloudy-day.png"/></span></span>
                </div>

                </motion.div>
            </>
            :
            null
        }
        </div>
        </div>
    )
 }

 export {Weather};