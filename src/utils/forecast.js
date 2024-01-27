const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=15893b863682528bca17b84fcb1192ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is Currently " + body.current.temperature + " Degrees Out. There is " + body.current.precip + " % chance of rain. But it Feels Like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast