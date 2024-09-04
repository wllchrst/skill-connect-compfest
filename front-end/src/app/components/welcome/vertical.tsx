import React from "react";

interface IVertical {
  children: React.ReactNode | React.ReactNode[];
}

function Vertical({ children }: IVertical) {
  return <div className="flex flex-col gap-2 border border-neutral-500 rounded-md p-4">{children}</div>;
}

export default Vertical;
