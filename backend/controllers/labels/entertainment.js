const labelsEntertaiment = require("../../models/labels/entertainment");

const labelsEntertaimentController = {
  getAllEntertaiment: async (req, res) => {
    const getLabelsEntertaiment = await labelsEntertaiment.find();
    res.status(200).json({
      success: true,
      data: getLabelsEntertaiment,
    });
  },

  getDetailEntertaiment: async (req, res) => {
    try {
      const labelsEntertaimentDetail = await labelsEntertaiment.findById(
        req.params.id
      );
      if (!labelsEntertaimentDetail) {
        res.status(404).json({ message: "ko thấy bài viết công nghệ" });
      }
      res.status(200).json({
        status: 200,
        data: labelsEntertaimentDetail,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "data error",
      });
    }
  },
};
module.exports = labelsEntertaimentController;
