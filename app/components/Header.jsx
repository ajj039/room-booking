"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth, setCurrenUser } from "@/store/storeSlice";
import { useRouter } from "next/navigation";
import logo from "@/app/assets/images/logo.svg";
import checkAuth from "../actions/checkAuth";
import destroySession from "../actions/destroySession";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const { isLoggedIn, currentUser } = useSelector((store) => store.user);
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("cusss", currentUser);

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      dispatch(setUserAuth(false));
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await checkAuth();
      dispatch(setCurrenUser({ isAuthenticated, user }));
    };
    checkAuthentication();
  }, [dispatch]);

  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-800 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image className="h-12 w-12" src={logo} alt="Bookit" priority />
            </Link>
            <div className="hidden md:flex ml-10 space-x-6">
              {isLoggedIn && (
                <Link
                  href="/"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Rooms
                </Link>
              )}
              <Link
                href="/bookings"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Bookings
              </Link>
              {isLoggedIn && (
                <Link
                  href="/rooms/add"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Add Room
                </Link>
              )}
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  <FaSignInAlt className="inline" /> Login
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  <FaUser className="inline" /> Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/rooms/my"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  <FaBuilding className="inline" /> My Rooms
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  <FaSignOutAlt className="inline" /> Sign Out
                </button>
                <p className="text-white">{currentUser?.email}</p>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isLoggedIn && (
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-700 transition duration-300"
            >
              Rooms
            </Link>
          )}
          <Link
            href="/bookings"
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-700 transition duration-300"
          >
            Bookings
          </Link>
          {isLoggedIn && (
            <Link
              href="/rooms/add"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-700 transition duration-300"
            >
              Add Room
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
