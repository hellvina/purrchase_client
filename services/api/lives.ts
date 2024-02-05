import { getIdFromLocalStorage } from "@/helpers/tokenHelper";

export const getLives = async (
  page: string,
  token: string | undefined
): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${apiUrl}lives/?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};

export const getLivesById = async (
  token: string | undefined
): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const userId = getIdFromLocalStorage();

    const response = await fetch(`${apiUrl}lives/user?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};
