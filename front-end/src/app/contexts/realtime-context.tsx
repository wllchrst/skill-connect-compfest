import { createContext } from "react";
import { IRealtimeContext } from "../interfaces/realtime-context-interface";

const realtimeContext = createContext<IRealtimeContext>({} as IRealtimeContext);
