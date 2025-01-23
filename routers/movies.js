const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router();

// INDEX ROUTE
router.get('/', movieController.index)

// SHOW ROUTE
router.get('/:id', movieController.show)

module.exports = router