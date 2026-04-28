interface BoldTextProps {
  children: React.ReactNode;
}

export default function BoldText({ children }: BoldTextProps) {
  return (
    <p className="text-white font-medium">
      {children}
    </p>
  );
}
