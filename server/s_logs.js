// Функция для записи данных в файл
let logs = []
const fs = require('fs');
function writeLogsToFile(logs) {
  let logsString = '';
  for (const log of logs) {
    logsString += JSON.stringify(log) + '\n';
  }

  fs.writeFile('./server/logs.txt', logsString, { flag: 'a' }, (err) => {
    if (err) {
      console.error('Error writing logs to file:', err);
    }
  });
}

module.exports = {writeLogsToFile};