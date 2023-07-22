import HomeCarousel from "@/components/HomeCarousel";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  // const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="text-blue-900 flex justify-between w-screen">
      <HomeCarousel />
    </div>
  );
}
