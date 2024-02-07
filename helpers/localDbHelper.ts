interface UserData {
  token?: string;
  id?: string;
}

export const setTokenToLocalDb = (token: string) => {
  if (window !== undefined) {
    localStorage.setItem("User.token", JSON.stringify(token));
  }
};

export const getTokenFromLocalDb = (): string => {
  const userToken = localStorage.getItem("User.token") as string;
  if (userToken !== null) {
    return userToken;
  }

  return "";
};

export const setIdToLocalDb = (userId: string) => {
  if (window !== undefined) {
    localStorage.setItem("User.id", JSON.stringify(userId));
  }
};

export const getIdFromLocalDb = (): string | null => {
  const userId = localStorage.getItem("User.id") as string;
  if (userId !== null && window !== undefined) {
    return userId;
  }

  return null;
};
