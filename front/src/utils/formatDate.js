function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const day = String(date.getDate() + 1).padStart(2, "0");
  return `${day}-${month}-${year}`;
}
function updatedFormatDate(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const day = String(date.getDate() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export const formattedDate = (date) => {
  return formatDate(date);
};
export const updatedFormattedDate = (date) => {
  return updatedFormatDate(date);
};
