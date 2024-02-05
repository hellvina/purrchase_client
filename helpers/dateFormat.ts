export const dateFormat = (dateString: string) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const formattedDate = formatDate(new Date(dateString));
  return formattedDate;
};
