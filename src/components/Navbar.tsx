import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="relative bg-gray-100 py-3 text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700">
      <div className=" flex flex-wrap items-center justify-center gap-14 px-6">
        <div className="absolute left-1 text-xl font-semibold text-black">
          {sessionData ? `Logged in as ${sessionData.user?.name}` : `Anonymous`}
        </div>
        <Link href="/" className="text-xl font-semibold text-black">
          Home
        </Link>
        <Link href="/todo" className="text-xl font-semibold text-black">
          Todo
        </Link>

        <div className="absolute right-1">
          <button
            className="text-xl font-semibold text-black"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
