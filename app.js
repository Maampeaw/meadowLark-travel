const express = require('express')
const expressHandlebars = require('express-handlebars')
const getFortune = require('./lib/fortune')

require('dotenv').config()

//configure view engine.

const port = process.env.port || 8080

    
const app = express()
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    }))
    

app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))



app.get('/', (req, res)=>{
    res.render('home')
})
app.get('/about', (req, res)=>{
    
    res.type('.html')
    res.render('about', {fortune: getFortune.getFortune()})
})
//custom 404 Page
app.use((req, res)=>{
    res.type('text/plain')
    res.status(404)
    res.render('404')
})

//Custom 500 page
app.use((err, req, res, next)=>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

app.listen(port, ()=>console.log(`Express Server running on http://localhost:${port}\npress Ctrl-C to terminate`))