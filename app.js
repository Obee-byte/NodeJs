const express = require('express')
const app = express()

const productRoutes = require('./api/routes/products')

app.use('/products', productRoutes) // We actually using other file
//insted of writing code here!

module.exports = app