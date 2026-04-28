import { CommonTextFields } from "./commonInterfaces";

export default function CommonText({ children, className }: CommonTextFields) {
  return (
    <p className={"text-xs text-zinc-400" + " " + className}>
      {children}
    </p>
  );
}
