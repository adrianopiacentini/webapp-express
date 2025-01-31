const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router();

// INDEX ROUTE
router.get('/', movieController.index)

// SHOW ROUTE
router.get('/:id', movieController.show)

// RELEASE_YEAR ROUTE
router.get('/api/years', movieController.releaseYear)

module.exports = router