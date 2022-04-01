const express = require("express");
const router = express.Router();
const controller = require('./tasks.controller');
router
    .route("/:id")
    .get(controller.getTask)
    .put(controller.updateTask)
    .patch(controller.patchTask)
    .delete(controller.deleteTask)

router
    .route("/")
    .get(controller.getAll)
    .post(controller.createTask)

    
module.exports = router;