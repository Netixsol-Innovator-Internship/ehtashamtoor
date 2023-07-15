import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  // const [category, setCategory] = useState(assignedCategory || "");
  // const [productProperties, setProductProperties] = useState(
  //   assignedProperties || {}
  // );
  let [images, setImages] = useState(existingImages || []);
  console.log(images);
  let [imageInfo, setImageInfo] = useState({});
  // const [categories, setCategories] = useState([]);

  const createProduct = async (e) => {
    e.preventDefault();
    console.log(imageInfo);

    const data = { title, description, price, images };

    try {
      if (_id) {
        const resp = await axios.put(`/api/products`, { ...data, _id });
        if (resp.data.message) {
          router.push("/products");
        }
      } else {
        const resp = await axios.post("/api/products", data);
        if (resp.data.message) {
          router.push("/products");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadFiles = async (e) => {
    const cloudlink = "https://api.cloudinary.com/v1_1/dvxzlrnwe/image/upload";
    let data = new FormData();
    data.append("file", e.target?.files[0]);
    console.log(data);

    data.append("upload_preset", "products");

    const resp = await axios.post(cloudlink, data);

    imageInfo = {
      public_id: resp.data.public_id,
      url: resp.data.secure_url,
    };

    setImages([...images, imageInfo]);

    console.log(images);
  };
  return (
    <form onSubmit={createProduct}>
      <label className="">Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 flex items-center cursor-pointer justify-center gap-1 font-normal text-gray-400 bg-gray-300">
          upload
          <input type="file" className="hidden" onChange={uploadFiles} />
        </label>
        {images.length > 0 &&
          images.map(({ url, public_id }, index) => {
            return (
              <div
                key={index}
                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
              >
                <img src={url} alt="" className="rounded-lg" />
              </div>
            );
          })}
      </div>

      <label className="">Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label className="">Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="bg-blue-900 btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
