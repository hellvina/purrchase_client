export const createUser = async (
  userData: object | undefined
): Promise<unknown> => {
  try {
    if (!userData) {
      throw Error("userData is undefined");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${apiUrl}user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("SEND DATA", userData);

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log("ERROR", error);
    throw Error("Error while creating account");
  }
};

export default createUser;
