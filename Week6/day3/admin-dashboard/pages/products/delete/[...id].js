import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;

  useLayoutEffect(() => {
    const getSingleProduct = async () => {
      try {
        const resp = await axios.get(`/api/products?id=${id}`);

        if (resp.data) {
          // console.log(resp.data);
          setProductInfo(resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, []);
  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    const resp = await axios.delete("/api/products?id=" + id);
    if (resp.data.success) {
      toast.success(resp.data.message);
      goBack();
    } else {
      toast.error(resp.data.message);
    }
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
