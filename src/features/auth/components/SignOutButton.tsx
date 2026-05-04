"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { signOutFromBrowser } from "../lib/signOutApp";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  children: ReactNode;
};

export default function SignOutButton({ children, ...rest }: Props) {
  const router = useRouter();

  return (
    <button type="button" {...rest} onClick={() => void signOutFromBrowser(router)}>
      {children}
    </button>
  );
}
