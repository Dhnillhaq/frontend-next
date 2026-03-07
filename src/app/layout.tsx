import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavLink from "./NavLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greenfields Production",
  description: "Sistem Manajemen Produksi Greenfields KEREN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <aside style={{
            width: "260px",
            background: "linear-gradient(180deg, #036143 0%, #047857 100%)",
            padding: "1.5rem 0",
            position: "fixed",
            height: "100vh",
            overflowY: "auto",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
              <h1 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "bold", 
                color: "white",
                marginBottom: "0.25rem"
              }}>
                Greenfields
              </h1>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>
                Demo Production Management
              </p>
            </div>

            <nav>
              <NavLink href="/" label="📊 Dashboard" />
              <div style={{ 
                padding: "0.5rem 1.5rem", 
                fontSize: "0.75rem", 
                fontWeight: "600",
                color: "rgba(255,255,255,0.6)",
                marginTop: "1rem"
              }}>
                MASTER DATA
              </div>
              <NavLink href="/groups" label="👥 Groups" />
              <NavLink href="/shifts" label="⏰ Shifts" />
              <NavLink href="/production-lines" label="🏭 Production Lines" />
              <div style={{ 
                padding: "0.5rem 1.5rem", 
                fontSize: "0.75rem", 
                fontWeight: "600",
                color: "rgba(255,255,255,0.6)",
                marginTop: "1rem"
              }}>
                OPERATIONS
              </div>
              <NavLink href="/operations" label="📝 Operations" />
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ marginLeft: "260px", flex: 1, background: "#f9fafb" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
