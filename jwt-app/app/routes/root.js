const express = require('express');
const router = express.Router();

router.use('/', require('./login_system.js'));
router.use('/', require('./app.js'));

module.exports = router;
