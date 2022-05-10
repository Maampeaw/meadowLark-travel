const fortunate = require('./fortune')


exports.home = (req, res)=>{
    res.render('home')
}

exports.about = (req, res)=>{
    res.render('about', {fortune: fortunate.getFortune()})
}

exports.catchAll = (req, res)=>{
    res.render('404')
}

// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next)=>{
    res.render('505')
}