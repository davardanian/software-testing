const express = require('express');
const router = express.Router();
const tasks = require('./tasks/tasks.routes');


router.use('/tasks', tasks);


module.exports = router;