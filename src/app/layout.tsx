import "./globals.css";
import Header from "./components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Header/>
        <main className="appContainer">{children}
        </main>
      </body>
    </html>
  );
}
