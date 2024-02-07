export const dateFormatToISO = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
  return isoDate;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
};
