import React from "react";
import { UserNav } from "../usernav";

function DashHeader() {
  return (
    <>
      <header className="flex justify-between">
        <h1>logo</h1>
        <UserNav />
      </header>
    </>
  );
}

export default DashHeader;
