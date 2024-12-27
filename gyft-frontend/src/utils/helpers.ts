export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
};

export const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };
  