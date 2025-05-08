const labelsEntertaimentController = require("../../controllers/labels/entertainment");

const router = require("express").Router();

router.get(
  "/labels/entertaiment",
  labelsEntertaimentController.getAllEntertaiment
);

router.get(
  "/labels/entertaiment/:id",
  labelsEntertaimentController.getDetailEntertaiment
);
module.exports = router;
