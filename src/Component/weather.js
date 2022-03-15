import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import images  from './Pics'

    const imgNum = images[Math.floor(Math.random() * images.length)]
    const RandomPics = `${imgNum}`

    let  lat;
    let  lon;

const Weather = () => {

    const [ weatherData, setWeatherData ] = useState ("");
    const [ location, setLocation ] = useState ('');
    const [icon, setIcon ] = useState ('')

    const apiSearch = () => { 

        const api = {
            key: "c33606fb194e61c82ababcb0fcc82128",
            base : "https://api.openweathermap.org/data/2.5/",
        }
        axios.get(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`).then((data)=>{
            setWeatherData(data.data)
            setIcon(`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`)
            console.log(data);
        })
    }

    const api = {
        key: "c33606fb194e61c82ababcb0fcc82128",
        base : "https://api.openweathermap.org/data/2.5/",
    }

    useEffect(()=>{
        const  showPosition =  (position)=> {
                lat=  position.coords.latitude;
                lon = position.coords.longitude;
               console.log('--------------------------');
               axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api.key}`)
               .then((data) => {
                   axios.get(`${api.base}weather?q=${data.data[0].name}&units=metric&APPID=${api.key}`)
                   .then((data) => {
                    setWeatherData(data.data);
                       setIcon(`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`)
                       
                   });
               });
           }
        navigator.geolocation.getCurrentPosition(showPosition);
       },[]);

    // console.log(Navigator.location);

    return (
        
        <div className="maindiv" style={{backgroundImage:`url(${RandomPics})`}}>
            <input type="text" placeholder="Enter Your City Name..." value={location}
            onKeyPress={(e)=>{
                if(e.code === 'Enter' || 'Return' )
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
                    <span className="info5">{Math.floor(weatherData.wind.speed)}<span>&nbsp;<span className="speeed">km/h</span>&nbsp;&nbsp;</span><img src="https://img.icons8.com/nolan/40/wind.png"/></span>
                </div>

                <div className="weather-wind2">
                    <span className="info6" >{Math.floor(weatherData.main.pressure)}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/50/000000/external-barometer-physics-icongeek26-outline-gradient-icongeek26.png"/></span></span>
                    <span className="info6" >{weatherData.weather[0].description.toUpperCase()}<span>&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/nolan/60/partly-cloudy-day.png"/></span></span>
                </div>
                <span className="name">© 2022 Mustapha.IB</span>
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