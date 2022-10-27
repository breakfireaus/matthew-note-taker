//dependants
const path = require('path');
const express = require('express');
const router = express.Router();

//Html routes

//this will send the note page
router.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//this will send the main page
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//exporting the module
module.exports = router;