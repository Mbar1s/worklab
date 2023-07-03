import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex p-5 items-center justify-between border-b-2 text-3xl bg-slate-900 text-white">
      <div>
        <Link to="/">
          <h1>Work Lab</h1>
        </Link>
      </div>
    </header>
  );
}
