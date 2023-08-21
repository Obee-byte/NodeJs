const express = require('express');
const path = require('path')
const {writeLogsToFile} = require('./server/s_logs');
const csvReader = require('./server/csv_reader');
const app = express();

const storyRoutes = require('./server/routes/story')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'public'))

let logs = []

setInterval(() => {
  writeLogsToFile(logs);
  writeLogsToFile(storyRoutes.getLogs());
  logs = []
}, 15000);

app.get('/r', async (req, res) => {
  const userIP = req.ip;
  const currentTime = new Date();
  const timestamp = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  logs.push({
        IP: userIP,
        time: timestamp,
        Action: 'refr data'
    });
  try {
    await csvReader.readCSVFiles('refresh'); // Повторно считываем данные CSV-файлов

    console.log('Data refreshed successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
  /* csvReader.readCSVFiles()
    .then(() => {
      console.log(`Data successfully refreshed:`);
    })
    .catch(error => {
      res.status(500).send('Error refreshing data');
    }); */
    writeLogsToFile(logs);
});

app.use('/story', storyRoutes.router)

app.use((req, res, next) => {
  id = req.url
  const error = new Error(`Page not found found: ${id}`)
  error.status= 404
  next(error)
})
/
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ 
      error: {
          message: error.message
      }
  })
})

module.exports = app