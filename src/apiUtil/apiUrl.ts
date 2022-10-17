const apiUrl = "http://localhost:3001";

export default apiUrl;

export interface UserSession {
  email: string;
  name: string;
  token: string;
  role: string;
}

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  role: string;
}
