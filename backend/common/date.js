const getUtcDateRange = (dateFrom, dateTo) => {
  const start = new Date(
    `${dateFrom.toISOString().split("T")[0]}T00:00:00.000Z`
  );
  const end = new Date(`${dateTo.toISOString().split("T")[0]}T23:59:59.999Z`);
  return { start, end };
};

module.exports = {
  getUtcDateRange,
};
