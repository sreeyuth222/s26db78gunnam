var express = require('express');
var router = express.Router();
var costume_controller = require('../controllers/costume');

// GET detail costume page
router.get('/detail', costume_controller.costume_view_one_Page);

// GET create costume page
router.get('/create', costume_controller.costume_create_Page);

// GET update costume page
router.get('/update', costume_controller.costume_update_Page);

// GET delete costume page
router.get('/delete', costume_controller.costume_delete_Page);

module.exports = router;