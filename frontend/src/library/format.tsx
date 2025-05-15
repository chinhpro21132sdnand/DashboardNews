export function formatdate(dateStr: string) {
  if (!dateStr) {
    return;
  }
  const [dateParse, dateTime] = dateStr.split(" ") || [];
  const [day1, month1, year1] = dateParse.split("/").map(Number);
  const date = new Date(year1, month1 - 1, day1); // VD: "2025-04-22"
  console.log(date, "date");
  const month = date.getMonth() + 1; // getMonth() trả về 0–11
  const day = date.getDate();
  const year = date.getFullYear();
  return `TH${month} ${day}, ${year}`;
}
