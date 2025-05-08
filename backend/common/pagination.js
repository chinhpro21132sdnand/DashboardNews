/**
 * Hàm phân trang cho Mongoose Model
 * @param {number} currentPage - Số trang hiện tại (bắt đầu từ 1)
 * @param {number} pageSize - Số lượng bản ghi trên mỗi trang
 * @param {object} model - Mongoose Model dùng để truy vấn dữ liệu
 * @returns {Promise<{pageSize: number, totalItems: number, totalPages: number, skip: number}>}
 */
const PaginationService = async (currentPage, pageSize, model) => {
  if (!pageSize || typeof pageSize !== "number") pageSize = 10;
  if (!currentPage || typeof currentPage !== "number") currentPage = 1;

  const skip = (currentPage - 1) * pageSize;

  const totalItems = await model.countDocuments();
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    pageSize,
    totalItems,
    totalPages,
    skip,
  };
};

module.exports = PaginationService;
