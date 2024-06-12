export interface UserModel {
  id: number;
  username: String;
  email: string;
  password: string;
  avatar: string | null;
  last_name: string | null;
  first_name: string | null;
  emailToken: string | null;
}