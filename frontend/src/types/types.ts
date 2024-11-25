interface User {
  id: string;
  email: string;
  role: string;
  username: string;
  error: string | null;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  user: string;
  createdAt: string;
  __v: number;
}

export type{User, Blog};