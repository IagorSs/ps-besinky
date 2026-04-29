import { CommonTextFields } from './commonInterfaces'

// TODO change this name, bold could to be property of some element
export default function BoldText({ children, className, fontWeight }: CommonTextFields) {
  const finalFontWight = fontWeight ?? "font-medium";

  return (
    <p className={"text-white " + finalFontWight + " " + className}>
      {children}
    </p>
  );
}
