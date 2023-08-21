const http = require('http')
const app = require('./app')

const port = 8080
const HOST = '192.168.137.108'
const server = http.createServer(app) //We splited our app separately
//from server to more productivity

server.listen(port, HOST, ()=> {
  console.log(`Server started at http://${HOST}:${port}/story/1`);
})

