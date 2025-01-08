export default function JotaiLayout({
  children,
  tictactoe,
}: {
  children: React.ReactNode;
  tictactoe: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      {children}
      {tictactoe}
    </div>
  );
}
