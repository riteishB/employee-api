"use strict";
const express = require("express");
const router = express.Router();
const db = require("../database");
const uuid = require("uuid");
const logger = require("../helpers/logger");
const externalService = require("../services/external-service");
const validator = require("../helpers/validator");

/* GET employees listing. */
router.get("", function (req, res) {
  return res.send(db.getAllData());
});

/* GET employee information by id */
router.get("/:id", function (req, res) {
  const id = req.params.id;
  return res.send(db.getFromDatabase(id));
});

/* POST employee information */
router.post("", async function (req, res) {
  try {
    // validate the request data
    const validitation = validator(req.body);
    if (validitation[0]) {
      // create a unique id based on timestamp
      const id = uuid.v1();
      req.body._id = id;
      // get a fav quote and a fav joke
      const externalData = await Promise.all([
        externalService.getSwansonQuote(),
        externalService.getDadJokes(),
      ]);

      req.body.favoriteQuote = externalData[0];
      req.body.favoriteJoke = externalData[1];

      // store in db
      db.writeToDatabase(req.body);
      return res.sendStatus(200);
    } else {
      res.status(400).send(validitation[1]);
    }
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

/* PUT employee information by id */
router.put("/:id", function (req, res) {
  try {
    // validate the request data
    const validitation = validator(req.body);
    if (validitation[0]) {
      const id = req.params.id;
      // store in db
      if (db.updateInDatabase(id, req.body)) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400).send(validitation[1]);
    }
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

/* DELETE an employee information by id */
router.delete("/:id", function (req, res) {
  try {
    const id = req.params.id;
    if (db.deleteFromDatabase(id)) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    logger.error(err);
  }
});

module.exports = router;
