import { createContext, useContext } from "react";
import { IUserContext } from "../interfaces/user-context-interface";

const userContext = createContext<IUserContext>({} as IUserContext);

export function getUserContext() {
  return userContext;
}

export function useUserContext() {
  return useContext(userContext);
}
