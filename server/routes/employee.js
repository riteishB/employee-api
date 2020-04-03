'use strict';

const express = require('express');
const router = express.Router();
const DATABASE = require('../database');


const db = new DATABASE();

/* GET employees listing. */
router.get('', function(req, res) {
  return res.send(db.getAllData());
});

module.exports = router;
