import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../Schemas";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const { googleSignin, user, emailPass } = useAuth();

  const handleGoogleSignin = async () => {
    try {
      googleSignin();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.success("login success");
    }
  }, [user]);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      emailPass(data.email, data.password);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-[#622a95] to-[#1c3160] w-screen h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email
              </label>
              <div className="mt-2 h-[3rem]">
                <input
                  id="email"
                  name="email"
                  type="text"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span
                    className={`font-semibold text-red-600 md:text-[14px] text-sm`}
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-white hover:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span
                    className={`font-semibold text-red-600 md:text-[14px] text-sm`}
                  >
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div className="text-white flex flex-col items-center">
              <h2 className="font-semibold">Sign in with</h2>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handleGoogleSignin();
                  }}
                >
                  Google
                </button>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Newbird?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-white hover:text-black"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
