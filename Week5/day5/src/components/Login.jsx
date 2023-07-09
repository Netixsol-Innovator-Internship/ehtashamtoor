import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../Schemas";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const [message, setMessage] = useState("nomessage");

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      let resp = await axios.post(`${process.env.REACT_APP_URL}/login`, data);
      console.log(resp.data)
      setMessage(resp.data.message);
      if (resp.data.message === "Login Success") {
        toast.success("Login Success");
        console.log(resp);
        navigate("/");
      } else if (resp.data.message === "no user with that username") {
        toast.error("no user with that username");
      } else if (resp.data.message === "Password incorrect") {
        toast.error("Password incorrect");
      } else if (resp.data.message === "No user present") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-[#622a95] to-[#1c3160] w-screen h-screen">
        {message}
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
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2 h-[3rem]">
                <input
                  id="username"
                  name="username"
                  type="text"
                  {...register("username")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <span
                    className={`font-semibold text-red-600 md:text-[14px] text-sm`}
                  >
                    {errors.username.message}
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
