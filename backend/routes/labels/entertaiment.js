const labelsEntertaimentController = require("../../controllers/labels/entertainment");

const router = require("express").Router();

router.get(
  "/labels/entertaiment",
  labelsEntertaimentController.getAllEntertaiment
);

module.exports = router;
