import Link from "next/link";

export default function RouteInterceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col space-y-4 w-full p-4 bg-gray-100">
        <header className="text-2xl font-bold">Route Interception</header>
        <section className="flex flex-row space-x-4">
          <Link
            href="/playground/route_interception/home"
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            Home
          </Link>
          <Link
            href="/playground/route_interception/payment"
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            Payment
          </Link>
          <Link
            href="/playground/route_interception/progress"
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            Progress
          </Link>
        </section>
      </div>
      {children}
    </div>
  );
}
