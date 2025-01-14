export default function RouteInterceptionPaymentLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      {children}
      {modal}
    </div>
  );
}
