const express = require('express')
const expressHandlebars = require('express-handlebars')

require('dotenv').config()

//configure view engine.

const port = process.env.port || 8080
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ]
    
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
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]

    res.type('.html')
    res.render('about', {fortune: randomFortune})
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