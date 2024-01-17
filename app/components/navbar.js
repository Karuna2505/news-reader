import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

function navbar() {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
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
        {user ? (
          <li className="px-2">
            <Link href="/Liked">Liked</Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
      {loading ? (
        <div className="p-2"></div>
      ) : !user ? (
        isMobile ? (
          <div className="relative">
            <img
              src="/menu.png"
              alt="menu"
              className="h-8 w-8 cursor-pointer"
              onClick={toggleDropdown}
            />
            <div
              className={`border absolute left-0 mt-2  ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col p-2 mt-2 rounded absolute">
                <li className="cursor-pointer" onClick={handleSignIn}>
                  Login
                </li>
                <li className="cursor-pointer" onClick={handleSignIn}>
                  Signup
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="flex">
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              Login
            </li>
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              Signup
            </li>
          </ul>
        )
      ) : (
        <>
          {isMobile ? (
            <div className="relative" onClick={toggleDropdown}>
              <img
                src={user.photoURL}
                alt="user"
                className="h-8 w-8 rounded-full m-2"
              />
              <div
                className={`border absolute left-0 mt-2  ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <p className="cursor-pointer m-3" onClick={handleSignOut}>
                  Log Out
                </p>
              </div>
            </div>
          ) : (
            <div className="flex">
              <img
                src={user.photoURL}
                alt="user"
                className="h-8 w-8 rounded-full m-2"
              />
              <p className="cursor-pointer m-3" onClick={handleSignOut}>
                Log Out
              </p>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
}

export default navbar;
