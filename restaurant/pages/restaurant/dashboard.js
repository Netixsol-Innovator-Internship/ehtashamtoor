import PageHeader from "@/components/PageHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (!session?.user?.role === "restaurant") {
      router.push("/auth/signin/restaurant");
    }
  }, [session, router]);
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 mt-5 px-2">
          <PageHeader heading="Orders" />
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-blue-300 border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                  >
                    Order Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td class=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    Mark
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    chowmein
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    12 july 2023
                  </td>
                </tr>
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td class=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    2
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    Mark
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    chowmein
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    12 july 2023
                  </td>
                </tr>
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td class=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    3
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    Mark
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    chowmein
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    12 july 2023
                  </td>
                </tr>
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td class=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    4
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    Mark
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    chowmein
                  </td>
                  <td class="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                    12 july 2023
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
