const labelsPolitics = require("../../models/labels/politics");

const labelsPoliticsController = {
  getAllPolitics: async (req, res) => {
    const { dateFrom, dateTo } = req.query;
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format" });
    }
    const getLabelsPolitics = await labelsPolitics
      .find()
      .sort({
        like: -1,
        comment: -1,
      })
      .where({
        viral: { $gte: startDate, $lte: endDate },
      })
      .limit(10);
    res.status(200).json({
      success: true,
      data: getLabelsPolitics,
    });
  },

  getDetailPolitics: async (req, res) => {
    try {
      const labelsPoliticsDetail = await labelsPolitics.findById(req.params.id);
      if (!labelsPoliticsDetail) {
        res.status(404).json({ message: "ko thấy bài viết công nghệ" });
      }
      res.status(200).json({
        status: 200,
        data: labelsPoliticsDetail,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "data error",
      });
    }
  },
};
module.exports = labelsPoliticsController;
