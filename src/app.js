const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; 

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(project);

  return response.send(project);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;

  const { id } = request.params;

  repo = repositories.find(repository => repository.id === id);
  
  if (typeof repo === "undefined") {
    return response.status(400).json({ error: "Repository not found." });
  }

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  return response.json(repo);


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  repoIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send(); 

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repo = repositories.find(repository => repository.id === id);
  
  if (typeof repo === "undefined") {
    return response.status(400).json({ error: "Repository not found." });
  }

  repo.likes += 1;

  return response.json(repo);
});

module.exports = app;
