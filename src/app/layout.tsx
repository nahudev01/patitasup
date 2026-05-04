import "./globals.css";
import { Poppins } from "next/font/google";

import AppChrome from "@/components/layout/AppChrome";
import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionProfile();
  const navUser = session
    ? { email: session.user.email ?? "", profileName: session.profileName }
    : null;

  return (
    <html lang="es">
      <body className={poppins.className}>
        <AppChrome navUser={navUser}>{children}</AppChrome>
      </body>
    </html>
  );
}
