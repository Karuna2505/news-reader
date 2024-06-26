import React, { useEffect, useState } from "react";
import Link from "next/link";

function navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleSignIn = async () => {
  
  };
  const handleSignOut = async () => {
   
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed h-16 w-full z-50 bg-black">
    <div className="px-4 py-2 flex border-b-2 items-center justify-between font-medium">
      <h1 className="text-xl">News Articles</h1>
      <ul className="flex">
        <li className="px-2">
          <Link href="/">Home</Link>
        </li>
       
          <li className="px-2">
            <Link href="/Liked">Liked</Link>
          </li>
       
      </ul>
    { isMobile ? (
  <div className="relative">
    <img
      src="/menu.png"
      alt="menu"
      className="h-8 w-8 cursor-pointer"
      onClick={toggleDropdown}
    />
    <div
      className={`fixed right-2 mt-3 ${
        isDropdownOpen ? "block" : "hidden"
      }`}
    >
      <div className="">
        <div>Login</div>
        <div>SignUp</div>
      </div>
    </div>
  </div>
) : (
  <ul className="flex">
    <li className="p-2 cursor-pointer" onClick={handleSignIn}>
      Login
    </li>
    <li className="p-2 cursor-pointer" onClick={handleSignOut}>
      Signup
    </li>
  </ul>
)}

    </div>
    </div>
  );
}

export default navbar;
