import type { ReactNode } from "react";
import { getCurrentUserEmail } from "@/lib/auth";
import MasarWidget from "@/components/MasarWidget";

export const metadata = {
  title: "My System",
  description: "Built with Tawjeeh Studio"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const userEmail = await getCurrentUserEmail();

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
        {/* Masar feedback button — do not remove. Floats on every page. */}
        <MasarWidget userEmail={userEmail} />
      </body>
    </html>
  );
}
