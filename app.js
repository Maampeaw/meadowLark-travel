const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')


require('dotenv').config()

//configure view engine.

// eslint-disable-next-line no-undef
const port = process.env.port || 8080

    
const app = express()
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    }))
    

app.set('view engine', 'handlebars')
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'))


//home Page
app.get('/', handlers.home)

//About Page
app.get('/about', handlers.about)

//custom 404 Page
app.use(handlers.catchAll)

//Custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
    '; press Ctrl-C to terminate.' )
    })
    } else {
    module.exports = app
    }
    