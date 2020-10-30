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


 return response.json(results);
});

app.post("/repositories", (request, response) => {
const {title, url, techs} = request.body;
const repository = { 
  id: uuid(),
  title,
  url,
  techs,
  likes:0
}

repositories.push(repository);

return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
const {title, url, techs} = request.body;
const { id } = request.params;

const findRepositoriesIndex = repositories.findIndex(repositorie => 
  repositorie.id === id)

if (findRepositoriesIndex === -1) {
  return response.status(400).json({ error:'No repositories found' });
}
const repository = {
  id,
  title, 
  url, 
  techs,
  likes: repositories[findRepositoriesIndex].likes
}
repositories[findRepositoriesIndex] = repository

return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {
const { id } = request.params

const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

if (findRepositoryIndex < 0) {
  return response.status(400).json({ error:'No repositories found' });
}
repositories.splice(findRepositoryIndex, 1);
return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
const { id } = request.params;
 
const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

if (findRepositoryIndex < 0) {
  return response.status(400).json({ error:'No repositories found' });
}
repositories[findRepositoryIndex].likes += 1;


return response.json(repositories[findRepositoryIndex])

});

module.exports = app;
