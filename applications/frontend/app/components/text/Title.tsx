import { CommonTextFields } from "./commonInterfaces";

export default function Title({ children, className, fontWeight }: CommonTextFields) {
  const finalFontWight = fontWeight ?? "font-bold";
  
  return (
    <h1 className={"text-4xl text-white " + finalFontWight +  " " + className}>
      {children}
    </h1>
  );
}
