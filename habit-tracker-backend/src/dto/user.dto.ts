export interface UserDTO {
  id?: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
