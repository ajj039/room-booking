"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "@/store/storeSlice";
import { useRouter } from "next/navigation";
import { setCurrenUser } from "@/store/storeSlice";
import logo from "@/app/assets/images/logo.svg";
import checkAuth from "../actions/checkAuth";
import destroySession from "../actions/destroySession";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const { isLoggedIn } = useSelector((store) => store.user);
  const router = useRouter();

  const handleLogut = async () => {
    const { success, error } = await destroySession();

    if (success) {
      dispatch(setUserAuth(false));
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await checkAuth();
      dispatch(setCurrenUser({ isAuthenticated, user }));
    };
    checkAuthentication();
  }, [dispatch]);
  return (
    <header className="bg-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="h-12 w-12"
                src={logo}
                alt="Bookit"
                priority={true}
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isLoggedIn && (
                  <Link
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                  >
                    Rooms
                  </Link>
                )}
                {/* <!-- Logged In Only --> */}
                <Link
                  href="/bookings"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  Bookings
                </Link>
                {isLoggedIn && (
                  <Link
                    href="/rooms/add"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                  >
                    Add Room
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* <!-- Right Side Menu --> */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Logged Out Only --> */}
              {!isLoggedIn && (
                <>
                  <Link
                    href="/login"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignInAlt className="mr-1 inline" /> Login
                  </Link>
                  <Link
                    href="/register"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaUser className="mr-1 inline" /> Register
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link href="/rooms/my">
                    <FaBuilding className="mr-1 inline" /> My Rooms
                  </Link>
                  <button
                    onClick={handleLogut}
                    className="mx-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignOutAlt className="mr-1 inline" /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile m/enu --> */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {isLoggedIn && (
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
            >
              Rooms
            </Link>
          )}
          {/* <!-- Logged In Only --> */}
          <Link
            href="/bookings"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Bookings
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/rooms/add"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                Add Room
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
