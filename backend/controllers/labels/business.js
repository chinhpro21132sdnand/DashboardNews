const labelsBusiness = require("../../models/labels/bussiness");

const labelsBusinessController = {
  getAllBusiness: async (req, res) => {
    const getLabelsBusiness = await labelsBusiness.find();
    res.status(200).json({
      success: true,
      data: getLabelsBusiness,
    });
  },

  getDetailBusiness: async (req, res) => {
    try {
      const labelsBusinessDetail = await labelsBusiness.findById(req.params.id);
      if (!labelsBusinessDetail) {
        res.status(404).json({ message: "ko thấy ancol drink" });
      }
      res.status(200).json({
        status: 200,
        data: labelsBusinessDetail,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "data error",
      });
    }
  },
};
module.exports = labelsBusinessController;
