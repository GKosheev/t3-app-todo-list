import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: sessionData } = useSession();

  return (
<nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
  <div className="w-full flex flex-wrap items-center justify-between px-6">
    <div>
      <a className="text-xl text-black font-semibold">{sessionData ? `Logged in as ${sessionData.user?.name}` : `Anonymous`}</a>
    </div>
    <div>
        <button className="text-xl text-black font-semibold" onClick={sessionData ? () => signOut() : () => signIn()}>{sessionData ? 'Log out' : 'Log in'}</button>
    </div>
  </div>
</nav>
  )
}

export default Navbar