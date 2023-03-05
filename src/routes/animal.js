'use strict';

const express = require('express');
// equivalent statements with the import
// const animalModel = require('../models/index');
const { animalCollection } = require('../models');

const router = express.Router();

router.get('/animal', async (req, res, next) => {
  const animal = await animalCollection.read();
  res.status(200).send(animal);
});

router.get('/animal/:id', async (req, res, next) => {
  const singleAnimal = await animalCollection.read(req.params.id);
  res.status(200).send(singleAnimal);
});

router.post('/animal', async (req, res, next) => {
  try {
    console.log('this is the body', req.body);
    const newAnimal = await animalCollection.create(req.body);
    res.status(200).send(newAnimal);
  } catch(e){
    next(e);
  }
});

router.put('/animal/:id', async (req, res, next) => {
  // const { id } = req.params; where the id live

  const animalsModified = await animalCollection.update(req.body, req.params.id);
  res.status(200).send(animalsModified);
});

router.delete('/animal/:id', async (req, res, next) => {
  let response = await animalCollection.delete(req.params.id);
  res.status(200).send(response);
});

module.exports = router;

