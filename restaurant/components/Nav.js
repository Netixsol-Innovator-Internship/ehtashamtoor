import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "@/components/Logo";
import AsideNav from "./AsideNav";
import { useState } from "react";

export default function Nav() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    await router.push("/");
    await signOut();
  }
  return (
    <header className="sticky top-0 bg-white shadow-md flex items-center justify-between md:px-8 px-2 py-2">
      {/* <!-- logo --> */}
      <h1 className="mb-0 text-center">
        <Link href="/">Restaurants</Link>
      </h1>
      <div className="md:hidden flex items-center p-4">
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* <!-- navigation --> */}
      <nav className="font-semibold hidden md:block">
        <ul className="flex items-center justify-center flex-wrap">
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer  md:text-sm text-[10px]">
            <Link href="/restaurant/dashboard">Dashboard</Link>
          </li>
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer  md:text-sm text-[10px]">
            <Link href="/restaurant/pending">Pending</Link>
          </li>
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer md:text-sm text-[10px]">
            <Link href="/restaurant/accepted">Accepted</Link>
          </li>
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer md:text-sm text-[10px]">
            <Link href="/restaurant/delivered">Delivered</Link>
          </li>
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer md:text-sm text-[10px]">
            <Link href="/restaurant/categories">Categories</Link>
          </li>
          <li className="md:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer md:text-sm text-[10px]">
            <Link href="/restaurant/foodItems">FoodItems</Link>
          </li>
        </ul>
      </nav>

      <AsideNav show={show} setShow={setShow} />

      {/* <!-- buttons ---> */}
      <div className="hidden md:flex gap-2">
        <Link
          className="  py-2 md:px-3 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          href="/usertype/signin"
        >
          Sign In
        </Link>
        <Link
          className=" py-2 md:px-3 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          href={`/usertype/signup`}
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
