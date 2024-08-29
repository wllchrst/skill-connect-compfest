export interface IUserContext {
  user: IUser;
  loggedIn: boolean;
  setUser: (user: IUser | null) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}
