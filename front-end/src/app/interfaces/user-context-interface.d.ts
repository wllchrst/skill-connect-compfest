export interface IUserContext {
  user: IUser | null;
  loggedIn: boolean;
  setUser: (user: IUser | null) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}
