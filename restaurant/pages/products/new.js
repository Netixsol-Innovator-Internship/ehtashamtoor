import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const NewProduct = () => {
  return (
    <Layout>
      <h1 className="font-semibold">Add New Product</h1>

      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
