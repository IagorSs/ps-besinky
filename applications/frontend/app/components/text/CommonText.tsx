interface CommonTextProps {
  children: React.ReactNode;
}

export default function CommonText({ children }: CommonTextProps) {
  return (
    <p className="text-xs text-zinc-400">
      {children}
    </p>
  );
}
