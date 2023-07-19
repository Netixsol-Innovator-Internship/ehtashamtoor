import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
// import { ReactSortable } from "react-sortablejs";

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
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  let [images, setImages] = useState(existingImages || []);
  // console.log(images);
  let [imageInfo, setImageInfo] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const resp = await axios.get("/api/categories");
    // console.log(resp.data);
    if (resp.data) {
      setCategories(resp.data);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const createProduct = async (e) => {
    e.preventDefault();
    // console.log(imageInfo);

    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    try {
      if (_id) {
        const resp = await axios.put(`/api/products`, { ...data, _id });
        if (resp.data.success) {
          router.push("/products");
          toast.success(resp.data.message);
        } else {
          console.log(resp.data.message);
          toast.error(resp.data.message);
        }
      } else {
        const resp = await axios.post("/api/products", data);
        console.log(resp.data);
        if (resp.data.success) {
          router.push("/products");
          toast.success(resp.data.message);
        } else {
          toast.error(resp.data.message);
          // console.log(resp.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(process.env.NEXT_PUBLIC_CLOUD_LINK);

  const uploadFiles = async (e) => {
    setIsLoading(true);
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
        setIsLoading(false);

        console.log(images);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // function updateImagesOrder(images) {
  //   // setImages(images);
  //   console.log(images);
  // }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  return (
    <form onSubmit={createProduct}>
      <label className="">Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">uncategorized</option>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-14 hover:text-white flex items-center cursor-pointer justify-center gap-1 font-normal text-gray-400 bg-gray-300">
          upload
          <input type="file" className="hidden" onChange={uploadFiles} />
        </label>
        <div className="flex gap-2 mt-2">
          {/* <ReactSortable list={images} setList={updateImagesOrder}> */}
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
          {isLoading && <Spinner />}
          {/* </ReactSortable> */}
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
