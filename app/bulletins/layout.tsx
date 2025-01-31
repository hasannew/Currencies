import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulletins",
};

export default function Layout({children}:{children:ReactNode}){
  return <>{children}</>
}