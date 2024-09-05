import { createContext, useContext } from "react";
import { IRealtimeContext } from "../interfaces/realtime-context-interface";

const realtimeContext = createContext<IRealtimeContext>({} as IRealtimeContext);

export function getRealtimeContext() {
  return realtimeContext;
}

export function useRealtimeContext() {
  return useContext(realtimeContext);
}
