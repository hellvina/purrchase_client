const createUser = async (userData: object | undefined) => {
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

interface UserData {
  email: string;
  password: string;
}

const loginUser = async (userData: UserData) => {
  try {
    if (!userData) {
      throw Error("userData is undefined");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API;
    const response = await fetch(
      `${apiUrl}user/signin?email=${userData.email}&password=${userData.password}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw Error("Error while creating account");
  }
};

export { createUser, loginUser };
