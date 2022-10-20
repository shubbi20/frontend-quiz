import { Ques } from "../interface/interface";
import apiUrl from "./apiUrl";

export const createQuizApi = async ({
  title,
  questions,
  token,
}: {
  title: string;
  questions: Ques[];
  token: string;
}) => {
  try {
    const url = apiUrl + "/quiz";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        questions,
      }),
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

export const getQuizApi = async (token: string) => {
  try {
    const url = apiUrl + "/quiz";
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

export const updateQuizApi = async ({
  id,
  title,
  questions,
  token,
}: {
  id: number;
  title: string;
  questions: Ques[];
  token: string;
}) => {
  try {
    const url = apiUrl + `/quiz/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        jwt: token,
      },
      body: JSON.stringify({
        title,
        questions,
      }),
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
    if (err.error) {
      return [null, err];
    }
    return [
      null,
      {
        error: "Failed to update data",
      },
    ];
  }
};

export const publishQuizApi = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  try {
    const url = apiUrl + `/quiz/publish/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
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
    if (err.error) {
      return [null, err];
    }
    return [
      null,
      {
        error: "Failed to update data",
      },
    ];
  }
};

export const deleteQuizApi = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  try {
    const url = apiUrl + `/quiz/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
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
        error: "Failed to delete data",
      },
    ];
  }
};

export const getPublishQuizApi = async (token: string) => {
  try {
    const url = apiUrl + "/quiz/publish";
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

export const getQuizByPermalink = async ({
  token,
  permalink,
}: {
  token: string;
  permalink: string;
}) => {
  try {
    const url = apiUrl + `/quiz/${permalink}`;
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
    return [data.data, null];
  } catch (err: any) {
    return [
      null,
      {
        error: "Error,Failed to fetch data",
      },
    ];
  }
};

export const getTestQuizApi = async ({ permalink }: { permalink: string }) => {
  try {
    const url = apiUrl + `/quiz/testquiz/${permalink}`;
    const response = await fetch(url, {
      method: "GET",
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
    return [data.data, null];
  } catch (err: any) {
    return [
      null,
      {
        error: "Error,Failed to fetch data",
      },
    ];
  }
};

export const evaluateQuizApi = async ({
  permalink,
  questions,
}: {
  permalink: string;
  questions: Ques[];
}) => {
  try {
    const url = apiUrl + `/quiz/evaluate`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        questions,
        permalink,
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
