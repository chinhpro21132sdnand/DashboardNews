const labelsBusinessController = require("../../controllers/labels/business");
const DashboardController = require("../../controllers/labels/dashboard");

const router = require("express").Router();

router.get("/labels/business", labelsBusinessController.getAllBusiness);

router.post("/labels/dashboard", DashboardController.getAllController);

router.get("/labels/business/:id", labelsBusinessController.getDetailBusiness);
module.exports = router;
