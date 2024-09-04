import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface ICheckbox {
  label: string;
  onCheckedChange?: (checked: boolean) => void;
}

function WelcomeCheckbox({ label, onCheckedChange }: ICheckbox) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Checkbox onCheckedChange={onCheckedChange} />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  );
}

export default WelcomeCheckbox;
