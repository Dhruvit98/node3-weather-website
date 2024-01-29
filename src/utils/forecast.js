const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=15893b863682528bca17b84fcb1192ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            
            callback(undefined,body.current.weather_descriptions[0].summary + ". It is Currently " + body.current.temperature + " Degrees Out. But it Feels Like " + body.current.feelslike + " degrees out.  There is " + body.current.precip + "% chance of rain.The Humidity is "  + body.current.humidity + "%.")

            // callback("Wind Speed is" + body.current.wind_speed[0] + ". humidity is  " + body.current.humidity + ". The Observation timis is " + body.current.observation_time )
        }
    })
}

module.exports = forecast