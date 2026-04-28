import { CommonTextFields } from "./commonInterfaces";

export default function Title2({ children, className }: CommonTextFields) {
  return (
    <h2 className={"text-lg font-semibold text-white" + " " + className}>
      {children}
    </h2>
  );
}
