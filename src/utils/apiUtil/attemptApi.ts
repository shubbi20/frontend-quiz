import apiUrl from "./apiUrl";

export const getAttemptApi = async ({
  token,
  permalink,
}: {
  token: string;
  permalink: string;
}) => {
  try {
    const url = apiUrl + `/attempt/${permalink}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwt: token,
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
