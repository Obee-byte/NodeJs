const express = require('express')
const router = express.Router()
const csvReader  = require('../csv_reader')

logs = []

router.get('/:id', async (req, res) => {
    try {
      const data = await csvReader.readCSVFiles(); // Считываем данные CSV-файлов
      const currentTime = new Date();
      const timestamp = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
      const userIP = req.ip;
      visitedPage = req.url
      logs.push({
        IP: userIP,
        time: timestamp,
        Page: visitedPage
        })
      const id = req.params.id;
      const combinedData = [data.file1Data, data.file2Data, id, data.file3Data];
      res.render('index', { combinedData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
});
  
module.exports = {router, 
    getLogs: () => {
        const currentLogs = logs;
        logs = [];
        return currentLogs;
      }};


/* Older working, but less improvment
router.get('/:id', (req, res) => {
    csvReader.readCSVFiles().then((data => {
        const currentTime = new Date();
        const timestamp = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const userIP = req.ip;
        visitedPage = req.url
        // const userAgent = req.get('User-Agent');
        logs.push({
            visitedPage: visitedPage,
            userIP: userIP,
            timestamp: timestamp
        });
        id = req.params.id
        const combinedData = [data.file1Data, data.file2Data, id];
        
        res.render('index', { combinedData });
    }))
})

let logs = []
module.exports = router */