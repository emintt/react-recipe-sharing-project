import { User, UserWithNoPassword } from "./DBTypes";
export type Credentials = Pick<User, 'username' | 'password'>;


export type AuthContextType = {
  // määritä contextin arvoja, joita halutaan käyttää
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};



