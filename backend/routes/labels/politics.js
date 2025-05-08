const labelsPoliticsController = require("../../controllers/labels/politics");

const router = require("express").Router();

router.get("/labels/politics", labelsPoliticsController.getAllPolitics);

router.get("/labels/politics/:id", labelsPoliticsController.getDetailPolitics);
module.exports = router;
