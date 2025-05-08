const labelsBusinessController = require("../../controllers/labels/business");

const router = require("express").Router();

router.get("/labels/bussiness", labelsBusinessController.getAllBusiness);

router.get("/labels/bussiness/:id", labelsBusinessController.getDetailBusiness);
module.exports = router;
