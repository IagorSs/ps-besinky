import { CommonTextFields } from "./commonInterfaces";

export default function CommonText({ children, className, fontWeight }: CommonTextFields) {
  return (
    <p className={"text-xs text-zinc-400 " + fontWeight + " " + className}>
      {children}
    </p>
  );
}
