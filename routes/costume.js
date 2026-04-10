var express = require('express');
var router = express.Router();

var costume_controller = require('../controllers/costume');

// GET costumes
router.get('/costume/:id', costume_controller.costume_detail);

module.exports = router;