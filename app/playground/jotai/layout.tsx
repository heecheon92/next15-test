export default function JotaiLayout({
  children,
  primitive,
  readonly,
  readwrite,
  writeonly,
}: {
  children: React.ReactNode;
  primitive: React.ReactNode;
  readonly: React.ReactNode;
  readwrite: React.ReactNode;
  writeonly: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      {children}
      {primitive}
      {readonly}
      {writeonly}
      {readwrite}
    </div>
  );
}
