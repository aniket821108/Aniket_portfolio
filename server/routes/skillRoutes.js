const express = require('express');
const router = express.Router();
const { getSkills } = require('../controllers/projectController');

router.get('/', getSkills);

module.exports = router;
