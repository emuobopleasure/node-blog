const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRoutes = require('./Routes/blogRoutes')
const dotenv = require("dotenv")
dotenv.config({path:'./.env'})

//express app
const app = express()

//connection to mongoDB
const dbURI = process.env.MONGODB_URL

const PORT = process.env.PORT || 5000;

mongoose.connect(dbURI)
    .then((result) => app.listen(PORT, () => {
        console.log(`port running on ${PORT}`)
    }))
    .catch((err) => {console.log(err)})

//register view engine
app.set('view engine', 'ejs')

//middleware and static files. making file in public folder accesible
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true}))  //for accepting form data

//listening for request
// app.listen(3000)

app.use((req, res, next) => {
    console.log('new request made')
    console.log('host:', req.hostname)
    console.log('path:', req.path)
    console.log('method:', req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'})
})

//blog routes
app.use(blogRoutes)

//redirects
app.get('/about-us', (req, res) => {
    res.render('about')
})

app.use((req, res) => {
    res.status(404).render('404', { title : '404 Not found'})
})