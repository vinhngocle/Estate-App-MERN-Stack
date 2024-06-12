export interface AuthModel {
  id: number;
  username: string;
  email: string;
  password: string;
  emailToken: string;
  isVerified: boolean;
}