import { CommonTextFields } from './commonInterface'

export default function BoldText({ children, className }: CommonTextFields) {
  return (
    <p className={"text-white font-medium" + " " + className}>
      {children}
    </p>
  );
}
