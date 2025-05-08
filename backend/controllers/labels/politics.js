const labelsPolitics = require("../../models/labels/politics");

const labelsPoliticsController = {
  getAllPolitics: async (req, res) => {
    const getLabelsPolitics = await labelsPolitics.find();
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
