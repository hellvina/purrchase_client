import { getIdFromLocalDb, getTokenFromLocalDb } from "@/helpers/localDbHelper";

export const getLives = async (page: string): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${apiUrl}lives/?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getLivesById = async (token: string): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const userId = getIdFromLocalDb();
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

export const createLive = async (userData: unknown): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const token = getTokenFromLocalDb();

    const response = await fetch(`${apiUrl}lives/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};

export const showLive = async (id: string): Promise<Object> => {
  try {
    const token = getTokenFromLocalDb();
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${apiUrl}lives/live?id=${id}`, {
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

export const listProducts = async (id: string): Promise<Object> => {
  try {
    console.log("ID", id);
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${apiUrl}/lives/user/producs?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("API DATA", data);
    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};

export const updateLive = async (
  id: string,
  liveData: Object
): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    const token = getTokenFromLocalDb();
    const response = await fetch(`${apiUrl}/lives?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(liveData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};
