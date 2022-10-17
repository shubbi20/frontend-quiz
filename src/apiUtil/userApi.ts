import apiUrl from "./apiUrl";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const url = apiUrl + "/login";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      if (data.error) {
        return [null, data.error];
      } else {
        return [null, data.message];
      }
    }

    return [data, null];
  } catch (err: any) {
    return [
      null,
      {
        error: "Error,Failed to fetch data",
      },
    ];
  }
};

export const signUpApi = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const url = apiUrl + "/signup";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error) {
        return [null, data.error];
      } else {
        return [null, data.message];
      }
    }

    return [data, null];
  } catch (err: any) {
    return [
      null,
      {
        error: "Error,Failed to fetch data",
      },
    ];
  }
};
