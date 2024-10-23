"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUserAuth } from "@/store/storeSlice";
import { useDispatch } from "react-redux";
import { useFormState } from "react-dom";
import createSession from "../actions/createSession";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, formAction] = useFormState(createSession, {});

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      dispatch(setUserAuth(true));
      toast.success("Logged in");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm mt-20">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Login
          </h2>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>

            <p className="text-center">
              No account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
