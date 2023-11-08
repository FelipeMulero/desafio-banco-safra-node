const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

const secret = "super-secret-key";

app.use(express.json());
app.use(cors());


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).send("Usuário ou senha inválidos");
  }

  const token = jsonwebtoken.sign({ username }, secret, { expiresIn: "1h" });

  res.status(200).send({ token });
});

app.get("/users", async (req, res) => {
  const response = await fetch("https://randomuser.me/");
  const data = await response.json();

  const users = data.results.map(user => ({
    id: user.login.uuid,
    name: user.name.full,
    email: user.email,
    gender: user.gender,
    age: user.dob.age
  }));

  await User.insertMany(users);

  res.status(200).send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  res.status(200).send(user);
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  const { name, email, gender, age } = req.body;

  user.name = name;
  user.email = email;
  user.gender = gender;
  user.age = age;

  await user.save();

  res.status(200).send(user);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  await user.remove();

  res.status(200).send(user);
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000")
}
)