import "./globals.css";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "@/components/SessionProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html>
      <body suppressHydrationWarning={true} className="antialiased flex flex-col min-h-screen">
        <>
          <SessionProvider session={session}>{children}</SessionProvider>
        </>
      </body>
    </html>
  );
}
