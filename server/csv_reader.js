const fs = require('fs');

let file1Data;
let file2Data;
let file3Data;
let file4Data;

// Функция для чтения CSV-файлов и сохранения данных
async function readCSVFiles(flag) {

  if (file1Data && file2Data&& file3Data && flag !== 'refresh') {
    // Если данные уже считаны, возвращаем их из памяти
    return { file1Data, file2Data, file3Data };
  }

  const file1Promise = readCSVFile('./server/main.csv');
  const file2Promise = readCSVFile('./server/buttons.csv');
  const file3Promise = readCSVFile('./server/enemy.csv');

  return Promise.all([file1Promise, file2Promise, file3Promise])
    .then(dataArray => {
      file1Data = dataArray[0];
      file2Data = dataArray[1];
      file3Data = dataArray[2];
      console.log(' >Data was readed!!!!');
      return {file1Data, file2Data, file3Data}
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

function readCSVFile(name) {
    return new Promise((resolve, reject) => {
      fs.readFile(name, 'utf-8',(err, data) => {
        if (err) {reject(err);
          return}
        const rows = data.split('\n')
        const headers = rows[0].replace('\r', '').split(';')
        const extractedData = []
      
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].replace('\r', '')
          if (row.trim() === '') {continue}
          const values = row.split(';')
          const extractedRow = {}
          for (let j = 0; j < headers.length; j++) {
            const header = headers[j]
            const value = values[j]
            extractedRow[header] = value
          }
          extractedData.push(extractedRow)
        }
        resolve(extractedData)
      })
    })
  }
  module.exports = {
    readCSVFiles
  };
