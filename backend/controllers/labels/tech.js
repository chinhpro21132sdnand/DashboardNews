const labelsTech = require("../../models/labels/tech");

const labelsTechController = {
  getAllTech: async (req, res) => {
    const getLabelsTech = await labelsTech.find();
    res.status(200).json({
      success: true,
      data: getLabelsTech,
    });
  },

  getDetailTech: async (req, res) => {
    try {
      const labelsTechDetail = await labelsTech.findById(req.params.id);
      if (!labelsTechDetail) {
        res.status(404).json({ message: "ko thấy bài viết công nghệ" });
      }
      res.status(200).json({
        status: 200,
        data: labelsTechDetail,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "data error",
      });
    }
  },
};
module.exports = labelsTechController;
