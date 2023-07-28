
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

db.query(`
  CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id)
  )
`);

db.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )
`);

db.query(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )
`);

// Хеширование пароля
const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

// Добавление товара в корзину
app.post('/cart/add', async (req, res) => {
const { productId } = req.body;

try {
    // Получение товара из базы данных
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

    if (rows.length === 0) {
    throw new Error('Product not found');
    }

    // Получение текущей корзины покупок
    const cart = req.session.cart || {};

    // Добавление товара в корзину
    if (cart[productId]) {
    cart[productId].quantity += 1;
    } else {
    cart[productId] = {
        id: productId,
        name: rows[0].name,
        price: rows[0].price,
        quantity: 1,
    };
    }

    // Сохранение корзины покупок в сессии
    req.session.cart = cart;

    res.status(200).json({ message: 'Product added to cart successfully' });
} catch (error) {
    res.status(400).json({ error });
}
});

// Просмотр содержимого корзины
app.post('/cart', async (req, res) => {
const cart = req.session.cart || {};

// Получение списка товаров для отображения в корзине
const productIds = Object.keys(cart);

if (productIds.length === 0) {
    res.status(200).json({ message: 'Cart is empty' });
} else {
    const [rows] = await db.query('SELECT * FROM products WHERE id IN (?)', [productIds]);

    const products = rows.map((row) => {
    const cartItem = cart[row.id];

    return {
        id: row.id,
        name: row.name,
        price: row.price,
        quantity: cartItem.quantity,
        total: row.price * cartItem.quantity,
    };
    });

    res.status(200).json({ products });
}
});

// Удаление товара из корзины
app.post('/cart/remove', async (req, res) => {
const { productId } = req.body;

try {
    // Получение текущей корзины покупок
    const cart = req.session.cart || {};

    // Удаление товара из корзины
    if (cart[productId]) {
    delete cart[productId];
    }

    // Сохранение корзины покупок в сессии
    req.session.cart = cart;

    res.status(200).json({ message: 'Product removed from cart successfully' });
} catch (error) {
    res.status(400).json({ error });
}
});

// Оформление заказа
app.post('/checkout', async (req, res) => {
    const { name, email, phone, address } = req.body;
  
    try {
      const cart = req.session.cart || {};
      // Получение текущей корзины покупок
  
      // Проверка наличия товаров в корзине
      if (Object.keys(cart).length === 0) {
        throw new Error('Cart is empty');
      }
  
      // Сохранение информации о заказе в базе данных

      const [result] = await db.query('INSERT INTO orders (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
      const orderId = result.insertId;
      const products = [];
  
      for (const productId in cart) {
        const cartItem = cart[productId];
        try {
            
        
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
  
        if (rows.length === 0) {
          throw new Error(`Product not found: ${productId}`);
        }
  
        const product = {
          id: rows[0].id,
          name: rows[0].name,
          price: rows[0].price,
          quantity: cartItem.quantity,
          total: rows[0].price * cartItem.quantity,
          orderId,
        };
  
        products.push(product);
      }catch (error) {console.error(error);
        res.status(400).json({ message: error.message });}
    }  
            
    
  
    //   await db.beginTransaction();
  
      try {
        // Сохранение товаров заказа в базе данных
        for (const product of products) {
          await db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [product.orderId, product.id, product.quantity, product.price]);
        }
  
        // Очистка корзины покупок
        req.session.cart = {};
  
        // await db.commit();
  
        res.status(200).json({ message: 'Order placed successfully' });
      } catch (error) {
        // await db.rollback();
  
        throw error;
        
      }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
  });


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
