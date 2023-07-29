import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      
      <Toaster position="bottom-center" />
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex items-center bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="logo" className="w-7 h-7 " />
          <span className="px-2 font-semibold">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
