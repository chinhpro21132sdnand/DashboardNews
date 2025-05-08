const labelsTechController = require("../../controllers/labels/tech");

const router = require("express").Router();

router.get("/labels/tech", labelsTechController.getAllTech);

router.get("/labels/tech/:id", labelsTechController.getDetailTech);
module.exports = router;
