const labelsTechController = require("../../controllers/labels/tech");

const router = require("express").Router();

router.get("/labels/tech", labelsTechController.getAllTech);

module.exports = router;
