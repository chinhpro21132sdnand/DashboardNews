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
export const getUtcDateRange2 = (
  dateFrom: Date,
  dateTo: Date
): { start: Date; end: Date } => {
  const start = new Date(
    Date.UTC(
      dateFrom.getFullYear(),
      dateFrom.getMonth(),
      dateFrom.getDate(),
      0,
      0,
      0,
      0
    )
  );

  const end = new Date(
    Date.UTC(
      dateTo.getFullYear(),
      dateTo.getMonth(),
      dateTo.getDate(),
      23,
      59,
      59,
      999
    )
  );

  return { start, end };
};
