"use strict";
const express = require("express");
const router = express.Router();
const DATABASE = require("../database");
const db = new DATABASE();
const uuid = require("uuid");
const logger = require("../helpers/logger");
const externalService = require("../services/external-service");

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
    // create a unique id based on timestamp
    const id = uuid.v1();
    req.body._id = id;

    // validate the body data
    const validity = true;
    if (validity) {
      // get a fav quote and a fav joke
      req.body.favoriteQuote = await externalService.getSwansonQuote();
      req.body.favoriteJoke = await externalService.getDadJokes();

      // store in db
      db.writeToDatabase(req.body);
      return res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

/* PUT employee information by id */
router.put("/:id", function (req, res) {
  try {
    const id = req.params.id;
    const validity = true;
    if (validity) {
      // store in db
      db.updateInDatabase(id, req.body);
      return res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
