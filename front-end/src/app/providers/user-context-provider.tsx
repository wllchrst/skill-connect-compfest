"use client";
import { useState } from "react";
import { getUserContext } from "../contexts/user-context";
import { IChildren } from "../interfaces/children-interface";
import { IUserContext } from "../interfaces/user-context-interface";
import { IUser } from "../interfaces/user-interface";

function UserContextProvider({ children }: IChildren) {
  const userContext = getUserContext();
  const [user, setUserState] = useState<IUser | null>(null);
  const [loggedIn, setLoggedInState] = useState(false);

  function setLoggedIn(loggedIn: boolean) {
    setLoggedInState(loggedIn);
  }

  function setUser(user: IUser | null) {
    if (user == null) setLoggedInState(false);
    else setLoggedInState(true);

    setUserState(user);
  }

  const value: IUserContext = {
    user: user,
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    setUser: setUser,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export default UserContextProvider;
