export default function JotaiLayout({
  children,
  persistence,
  primitive,
  selector,
  deepselector,
  readonly,
  readwrite,
  writeonly,
}: {
  children: React.ReactNode;
  persistence: React.ReactNode;
  primitive: React.ReactNode;
  selector: React.ReactNode;
  deepselector: React.ReactNode;
  readonly: React.ReactNode;
  readwrite: React.ReactNode;
  writeonly: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      {children}
      {persistence}
      {primitive}
      {selector}
      {deepselector}
      {readonly}
      {writeonly}
      {readwrite}
    </div>
  );
}
