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
  // console.log(images);
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
  // console.log(process.env.NEXT_PUBLIC_CLOUD_LINK);

  const uploadFiles = async (e) => {
    // https://api.cloudinary.com/v1_1/cloudname/image/upload
    // just add your cloudinary cloudname link above
    // const cloudlink = process.env.NEXT_PUBLIC_CLOUD_LINK;

    // should be noted that you have to use NEXT_PUBLIC otherwise you may get undefined
    let data = new FormData();
    data.append("file", e.target?.files[0]);

    data.append("upload_preset", "products");

    try {
      const resp = await axios.post(process.env.NEXT_PUBLIC_CLOUD_LINK, data);

      if (resp.data) {
        imageInfo = {
          public_id: resp.data.public_id,
          url: resp.data.secure_url,
        };
        setImageInfo(imageInfo);

        setImages([...images, imageInfo]);

        console.log(images);
      }
    } catch (error) {
      console.log(error.message);
    }
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
        <label className="w-24 h-14 hover:text-white flex items-center cursor-pointer justify-center gap-1 font-normal text-gray-400 bg-gray-300">
          upload
          <input type="file" className="hidden" onChange={uploadFiles} />
        </label>
        <div className="flex gap-2 mt-2">
          {images.length > 0 &&
            images.map(({ url, public_id }, index) => {
              return (
                <div
                  key={index}
                  className="h-auto md:w-28 w-24 bg-white shadow-sm rounded-lg shadow-gray-800"
                >
                  <img
                    src={url}
                    alt="image"
                    className="rounded-lg h-full w-full"
                  />
                </div>
              );
            })}
        </div>
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
