function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const day = String(date.getDate() + 1).padStart(2, "0");
  return { year, month, day };
}
export const formattedDate = (date) => {
  const { year, month, day } = formatDate(date);
  return date === null ? "" : `${day}-${month}-${year}`;
};
export const updatedFormattedDate = (date) => {
  const { year, month, day } = formatDate(date);
  return date === null ? "" : `${year}-${month}-${day}`;
};
export const jsonDDMMYYDate = (date) => {
  return formatDate(date);
};
