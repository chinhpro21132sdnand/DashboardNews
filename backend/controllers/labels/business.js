const labelsBusiness = require("../../models/labels/bussiness");

const labelsBusinessController = {
  getAllBusiness: async (req, res) => {
    const { dateFrom, dateTo, lang } = req.query;
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format" });
    }
    const getLabelsBusiness = await labelsBusiness
      .find()
      .sort({
        like: -1,
        comment: -1,
      })
      .where({
        viral: { $gte: startDate, $lte: endDate },
        index: lang,
      })
      .limit(10);
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
