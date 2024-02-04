const getLives = async (
  page: string,
  token: string | undefined
): Promise<Object> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API;
    console.log("URL", apiUrl);

    const response = await fetch(`${apiUrl}lives/?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("RESPONSE", data);

    return data;
  } catch (error) {
    console.log("Error while fetching data", error);
    throw error;
  }
};

export default getLives;
