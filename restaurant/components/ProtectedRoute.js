import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Do nothing, wait for the session data to be loaded
      return;
    }
    if (!session) {
      router.push("/usertype/signin");
    } else {
      setIsLoading(false);
    }
  }, [session, status]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <BeatLoader />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;