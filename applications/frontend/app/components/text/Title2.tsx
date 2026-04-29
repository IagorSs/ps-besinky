import { CommonTextFields } from "./commonInterfaces";

export default function Title2({ children, className, fontWeight }: CommonTextFields) {
  const finalFontWight = fontWeight ?? "font-semibold";

  return (
    <h2 className={"text-lg text-white " + finalFontWight +  " " + className}>
      {children}
    </h2>
  );
}
