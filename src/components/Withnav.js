import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router";
import Footer from "./footer";

export default function Withnav() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Outlet style={{ minHeight: "100vh", width: "100%" }} />
    </div>
  );
}
