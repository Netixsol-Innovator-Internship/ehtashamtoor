import { RegisterRes } from "@/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterRestaurant = () => {
  const [Message, setMessage] = useState("");
  const [IsError, setIsError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterRes),
  });

  const onSubmit = async (data) => {
    const { name, email, password, country, city } = data;

    const resp = await axios.post("/api/signupRestaurant", data);
    // console.log(resp.data);
    if (resp.data.success) {
      setIsError(false);
      router.push("/auth/signin/restaurant");
    } else {
      setIsError(true);
    }
    setMessage(resp.data.message);

    // reset();
  };
  return (
    <section className=" pb-2">
      <div className="lg:grid lg:min-h-screen ">
        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:px-16 "
        >
          <div className="md:w-full xl:px-36 lg:px-20 w-fit">
            <h1 className="mt-2 text-2xl text-center font-bold  sm:text-3xl md:text-4xl">
              Register your restaurant
            </h1>
            <p className="mt-4 leading-relaxed md:text-xl text-gray-500 text-center">
              Please Provide neccessary details
            </p>

            <div className="font-bold text-center mt-3">
              <h1 className={IsError ? "text-red-500" : "text-green-500"}>
                {Message}
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 h-[4.6rem]">
                <label htmlFor="Name" className="block text-sm font-semibold  ">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  id="Name"
                  {...register("name")}
                  name="name"
                  className="mt-1 w-full rounded-md border-gray-500 bg-white text-lg text-gray-700 shadow-md p-1"
                />

                {errors.name && (
                  <span className={`text-red-600 md:text-[15px] text-sm`}>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="col-span-6 h-[4.6rem]">
                <label
                  htmlFor="Email"
                  className="block text-sm font-semibold  "
                >
                  Restaurant Email
                </label>
                <input
                  type="email"
                  id="Email"
                  {...register("email")}
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.email && (
                  <span className="text-red-600 md:text-[15px] text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="col-span-6 h-[4.6rem]">
                <label
                  htmlFor="country"
                  className="block text-sm font-semibold  "
                >
                  Restaurant Country
                </label>
                <input
                  type="country"
                  id="country"
                  {...register("country")}
                  name="country"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.country && (
                  <span className="text-red-600 md:text-[15px] text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div className="col-span-6 h-[4.6rem]">
                <label htmlFor="city" className="block text-sm font-semibold  ">
                  Restaurant city
                </label>
                <input
                  type="city"
                  id="city"
                  {...register("city")}
                  name="city"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.city && (
                  <span className="text-red-600 md:text-[15px] text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="col-span-6 h-[4rem]">
                <label
                  htmlFor="Password"
                  className="block text-sm font-semibold  "
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.password && (
                  <span className="text-red-600 md:text-[15px] text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="col-span-6 mt-2  flex flex-col md:flex-row sm:flex sm:items-center sm:gap-4 gap-2">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md w-full md:w-auto border border-blue-600 bg-blue-600 px-12 py-3 text-md font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Sign up
                </button>
                <p className="mt-4 text-[12px] text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link
                    href={"/auth/signin/restaurant"}
                    className="text-orange-600 underline cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegisterRestaurant;