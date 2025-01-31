"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { pages } from "./config/headerConfig";

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
            width:"100%",
            
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              justifyContent:"space-between"
            }}
          >
            {pages.map((l, i) => (
              <Link
                key={i}
                href={l.link}
                style={{
                  color: "#4a5568",
                  textDecoration: "none",
                }}
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </nav>
  );
}
