export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}