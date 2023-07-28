
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Подключение к базе данных MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'for_node_js'
});

// Настройка сессии
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Настройка парсера для POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Создание таблицы пользователей
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )
`);

// Хеширование пароля
const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

// Регистрация пользователя
app.get('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Хеширование пароля
    const hashedPassword = hashPassword(password);
  
    try {
      // Поиск пользователя в базе данных
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (rows.length > 0) {
        throw new Error('User already exists');
      }
  
      // Создание нового пользователя
      await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
  
  // Вход в систему
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Поиск пользователя в базе данных
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        throw new Error('User not found');
      }
  
      // Проверка пароля
      const isPasswordValid = bcrypt.compareSync(password, rows[0].password);
  
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
  
      // Создание токена для аутентификации
      const token = jwt.sign({ userId: rows[0].id }, 'secret');
  
      // Сохранение токена в сессии
      req.session.token = token;
  
      res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  app.listen(8080, () =>{
    console.log(`Server is rinning at http://localhost:8080`);
  })
