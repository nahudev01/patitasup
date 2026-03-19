"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

type Props = {
  children: React.ReactNode;
};

const LayoutShell = ({ children }: Props) => {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/register" ||
    pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default LayoutShell;