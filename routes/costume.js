var express = require('express');
var router = express.Router();

var costume_controller = require('../controllers/costume');

// GET costumes
router.get('/', costume_controller.costume_view_all_Page);

module.exports = router;