import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "./components/SessionProvider";
export const metadata: Metadata = {
  title: "My App",
  description: "My Cool App",
};

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
