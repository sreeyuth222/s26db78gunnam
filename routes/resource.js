var express = require('express');
var router = express.Router();
var costume_controller = require('../controllers/costume');

// GET all costumes
router.get('/costumes', costume_controller.costume_list);

// GET one costume
router.get('/costumes/:id', costume_controller.costume_detail);

// POST create costume
router.post('/costumes', costume_controller.costume_create_post);

// PUT update costume
router.put('/costumes/:id', costume_controller.costume_update_put);

// DELETE costume
router.delete('/costumes/:id', costume_controller.costume_delete);

module.exports = router;