const express = require('express')
const app = express()

const productRoutes = require('./api/routes/products')

const orderRoutes = require('./api/routes/orders')

app.use('/products', productRoutes) // We actually using other file
//insted of writing code here!

app.use('/orders', orderRoutes)

module.exports = app