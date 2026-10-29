export const API_BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    next: {
      revalidate: 30,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      `API Error: ${response.statusText}`,
      response.status,
      response.statusText
    );
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(
      `Network Error: Tidak dapat terhubung ke server API`
    );
  }
}