export const getUtcDateRange = (
  dateTo: Date,
  dateFrom: Date
): { start: Date; end: Date } => {
  const start = new Date(
    Date.UTC(
      dateFrom.getUTCFullYear(),
      dateFrom.getUTCMonth(),
      dateFrom.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  const end = new Date(
    Date.UTC(
      dateTo.getUTCFullYear(),
      dateTo.getUTCMonth(),
      dateTo.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );
  return { start, end };
};
