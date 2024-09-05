"use client";
import { useState } from "react";
import { getRealtimeContext } from "../contexts/realtime-context";
import { IChildren } from "../interfaces/children-interface";
import { IRealtimeContext } from "../interfaces/realtime-context-interface";

function RealtimeContextProvider({ children }: IChildren) {
  const [c, setc] = useState(false);
  const realtimeContext = getRealtimeContext();

  function change() {
    setc(!c);
  }

  const value: IRealtimeContext = {
    c: c,
    change: change,
  };

  return (
    <realtimeContext.Provider value={value}>
      {children}
    </realtimeContext.Provider>
  );
}

export default RealtimeContextProvider;
