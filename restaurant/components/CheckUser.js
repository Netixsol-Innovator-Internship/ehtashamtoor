import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckUser = () => {
  const router = useRouter();
  const { state } = router.query;

  return (
    <div className="w-screen h-[90vh] flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl">
          {state.toUpperCase()} for a customer or a Restaurant?{" "}
        </h1>
        <div className="flex gap-2 justify-center">
          <Link
            href={`/auth/${state}/customer`}
            className="lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-700 text-white hover:bg-blue-900 text-sm font-bold  rounded-xl transition duration-200"
          >
            Customer
          </Link>
          <Link
            href={`/auth/${state}/restaurant`}
            className="lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-700 text-white hover:bg-blue-900 text-sm font-bold  rounded-xl transition duration-200"
          >
            Restaurant
          </Link>
          {/* <button
            onClick={signIn}
            className="lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-700 text-white hover:bg-blue-900 text-sm font-bold  rounded-xl transition duration-200"
          >
            Restaurant
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CheckUser;
