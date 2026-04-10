var express = require('express');
var router = express.Router();

var costume_controller = require('../controllers/costume');

// GET costumes
router.get('/costume/:id', costume_controller.costume_detail);
router.put('/costumes/:id', costume_controller.costume_update_put);
router.delete('/costumes/:id', costume_controller.costume_delete);
module.exports = router;