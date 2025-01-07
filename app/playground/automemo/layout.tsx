export default function AutoMemoLayout({
  children,
  react_compiler,
}: {
  children: React.ReactNode;
  react_compiler: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      {children}
      {react_compiler}
    </div>
  );
}
