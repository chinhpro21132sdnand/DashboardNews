const labelsBusiness = require("../../models/labels/bussiness");
const labelsEntertaiment = require("../../models/labels/entertainment");
const labelsPolitics = require("../../models/labels/politics");
const labelsTech = require("../../models/labels/tech");
const { getUtcDateRange } = require("../../common/date");

const DashboardController = {
  getAllController: async (req, res) => {
    try {
      const { start, end } = req.body;
      const [business, entertainment, politics, tech] = await Promise.all([
        labelsBusiness.countDocuments({ viral: { $gte: start, $lte: end } }),
        labelsEntertaiment.countDocuments({
          viral: { $gte: start, $lte: end },
        }),
        labelsPolitics.countDocuments({ viral: { $gte: start, $lte: end } }),
        labelsTech.countDocuments({ viral: { $gte: start, $lte: end } }),
      ]);
      res.status(200).json({
        success: true,
        data: [
          {
            type: "business",
            value: business,
          },
          {
            type: "entertaiment",
            value: entertainment,
          },
          {
            type: "politics",
            value: politics,
          },
          {
            type: "tech",
            value: tech,
          },
        ],
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dashboard:", error);
      res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra khi lấy dữ liệu dashboard.",
      });
    }
  },
};

module.exports = DashboardController;
