const labelsTech = require("../../models/labels/tech");

const labelsTechController = {
  getAllTech: async (req, res) => {
    try {
      const { dateFrom, dateTo, lang } = req.query;
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid date format" });
      }

      const getLabelsTech = await labelsTech.aggregate([
        {
          $match: {
            viral: { $gte: startDate, $lte: endDate }, // lọc theo ngày
            index: lang, // lọc theo ngôn ngữ
          },
        },
        {
          $sort: {
            like: -1,
            comment: -1,
          },
        },
        {
          $group: {
            _id: "$label_1", // nhóm theo nhãn
            articles: { $push: "$$ROOT" }, // gom các bài vào mảng
            count: { $sum: 1 }, // đếm số bài
          },
        },
        {
          $project: {
            _id: 1,
            count: 1,
            articles: { $slice: ["$articles", 10] }, // chỉ lấy 10 bài đầu theo thứ tự đã sort
          },
        },
        // bạn có thể thêm $limit nếu muốn giới hạn số nhóm trả về
      ]);

      console.log(getLabelsTech, "chính");
      res.status(200).json({
        success: true,
        data: getLabelsTech,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
module.exports = labelsTechController;
