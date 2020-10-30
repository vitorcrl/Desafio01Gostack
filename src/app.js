const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 const { title } = request.query;

 const results = title
 ?repositories.filter(repositorie => repositorie.title.includes(title))
 :repositories;
 return response.json(results)
});

app.post("/repositories", (request, response) => {
const {title, url, techs, likes} = request.body;
const repositorie = { id: uuid(), title, url, techs, likes}

repositories.push(repositorie);

return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
const { id } = request.params

const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id)

if (repositoriesIndex < 0) {
  return response.status(400).json({ error:'No repositories found' });
}
repositories.splice(repositoriesIndex, 1);
return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
