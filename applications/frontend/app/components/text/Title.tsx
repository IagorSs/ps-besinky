import { CommonTextFields } from "./commonInterfaces";

export default function Title({ children, className }: CommonTextFields) {
  return (
    <h1 className={"text-4xl font-bold text-white" + " " + className}>
      {children}
    </h1>
  );
}
