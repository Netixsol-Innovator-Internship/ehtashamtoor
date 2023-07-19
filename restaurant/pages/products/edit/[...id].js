import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

const EditProduct = () => {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id)

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
  return (
    <Layout>
      <h1 className="font-semibold">Edit Product</h1>
      {productInfo ? <ProductForm {...productInfo} /> : ""}
    </Layout>
  );
};

export default EditProduct;
