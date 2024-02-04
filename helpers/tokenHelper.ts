export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(process.env.TOKEN_KEY || "");
};

export const setLocalStorage = (token: string) => {
  localStorage.setItem(process.env.TOKEN_KEY || "", token);
};
