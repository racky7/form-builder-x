export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
