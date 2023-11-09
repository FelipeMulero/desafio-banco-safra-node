const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');
const cors = require("cors");
const app = express();

const usersDataLogin = {
  id: 1, name: 'Teste Safra',
  email: 'teste-safra@gmail',
  gender: 'male', age: 100
};
const secret = "super-secret-key";

app.use(express.json());
app.use(cors());


app.post("/inserir-dados", (req, res) => {
  const { username, password } = req.body;

  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(sql, [username, password], (err) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
    } else {
      res.status(200).send('Dados inseridos com sucesso');
    }
  });
});

app.post("/login1", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).send("Usuário ou senha inválidos");
  }

  const token = jsonwebtoken.sign({ username }, secret, { expiresIn: "1h" });

  res.status(200).send({ token });
});

app.post("/login", async (req, res) => {
  try {
    res.status(200).send(usersDataLogin);
  } catch (error) {
    console.error('Erro ao obter dados da API Random User:', error);
    res.status(500).send('Erro ao obter dados da API Random User');
  }
});

app.get("/query-data/:age", async (req, res) => {
  const age = Number(req.params.age);

  try {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    const usersData = response.data.results
      .filter(user => user.dob.age === age)
      .map(user => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        gender: user.gender,
        age: user.dob.age
      }));

    if (usersData.length === 0) {
      return res.status(200).send(response.data.results
              .map(user => ({
                id: user.login.uuid,
                name: `${user.name.first} ${user.name.last}`,
                email: user.email,
                gender: user.gender,
                age: user.dob.age
              })));
    }

    res.status(200).send(usersData);
  } catch (error) {
    console.error('Erro ao obter dados da API Random User:', error);
    res.status(500).send('Erro ao obter dados da API Random User');
  }
});


app.post("/integrar-dados", async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    const usersData = response.data.results.map(user => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      gender: user.gender,
      age: user.dob.age
    }));

    const stmt = db.prepare('INSERT INTO users (id, name, email, gender, age) VALUES (?, ?, ?, ?, ?)');
    usersData.forEach(user => {
      stmt.run(user.id, user.name, user.email, user.gender, user.age);
    });
    stmt.finalize();

    res.status(200).json({ message: 'Dados integrados com sucesso no banco local.' });
  } catch (error) {
    console.error('Erro ao integrar dados:', error);
    res.status(500).json({ error: 'Erro ao integrar dados com o banco local' });
  }
});


app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, gender, age } = req.body;

  const sql = `UPDATE users SET name = ?, email = ?, gender = ?, age = ? WHERE id = ?`;

  db.run(sql, [name, email, gender, age, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).send('Erro ao atualizar usuário');
    } else {
      res.status(200).send('Usuário atualizado com sucesso');
    }
  });
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM users WHERE id = ?`;

  db.run(sql, [id], (err) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      res.status(500).send('Erro ao excluir usuário');
    } else {
      res.status(200).send('Usuário excluído com sucesso');
    }
  });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000")
}
)