const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app) //We splited our app separately
//from server to more productivity

server.listen(port, ()=> {
  console.log('Server started at http://localhost:3000');
})