const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

const populateDatabase = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();

    const users = data.results.map(user => ({
      username: user.login.username,
      password: user.login.password
    }));

    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)');
      
      const stmt = db.prepare('INSERT INTO users VALUES (?, ?)');
      users.forEach(user => {
        stmt.run(user.username, user.password);
      });
      stmt.finalize();
      
      console.log('Dados inseridos no banco de dados com sucesso!');
    });
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    db.close();
  }
};

populateDatabase();


// const fetch = require('node-fetch');
// const mongoose = require('mongoose');
// const User = require('./models/user');

// mongoose.connect('mongodb://localhost:3000/database.db', { useNewUrlParser: true, useUnifiedTopology: true });

// const populateDB = async () => {
//   const response = await fetch('https://randomuser.me/api/?results=10');
//   const data = await response.json();

//   const users = data.results.map(user => ({
//     username: user.login.username,
//     password: user.login.password
//   }));

//   await User.insertMany(users);

//   console.log('Dados inseridos com sucesso!');
//   mongoose.connection.close();
// };

// populateDB();
