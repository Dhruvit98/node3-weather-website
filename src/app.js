const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set ('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'weather app',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req, res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {        
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})
app.get('/weather',(req, res) => {

    if (!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }   

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })   



    // res.send({
    //     forecast: 'It Is Snowing',
    //     location: 'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        returnres.send({
            error: "You must provide a serach term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})
    

app.get('/help/*',(req,res) => {
    res.render('404', {
        title:'404',
        name: 'Andrew Mead',
        errorMessage: 'Help Artical Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found.'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) 