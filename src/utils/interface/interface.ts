export interface UserSession {
  email: string;
  name: string;
  token: string;
}

export interface UserInterface {
  id: number;
  email: string;
  password: string;
}

export interface Ques {
  questionNo: number;
  ques: string;
  answer: string[];
  options: string[];
}
