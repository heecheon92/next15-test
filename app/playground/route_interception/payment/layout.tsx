export default function RouteInterceptionPaymentLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh]">
      {children}
      {modal}
    </div>
  );
}
