interface UserData {
  token?: string;
  id?: string;
}

export const setTokenToLocalDb = (token: string) => {
  if (window !== undefined) {
    localStorage.setItem("User.token", token);
  }
};

export const getTokenFromLocalDb = (): string => {
  const userToken = localStorage.getItem("User.token");
  if (userToken !== null) {
    return userToken;
  }

  return "";
};

export const setIdToLocalDb = (userId: string) => {
  if (window !== undefined) {
    localStorage.setItem("User.id", userId);
  }
};

export const getIdFromLocalDb = (): string | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("User.id");
  }

  return null;
};
