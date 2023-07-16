import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

const CatgoryPage = ({ swal }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

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
  const saveCategory = async (e) => {
    e.preventDefault();

    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      const resp = await axios.put("/api/categories", data);
      if (resp.data) {
        setName("");
        setEditedCategory(null);
        setParentCategory(0);
        getCategories();
        setProperties([]);
      }
    } else {
      const resp = await axios.post("/api/categories", data);

      setName("");
      setProperties([]);
      setParentCategory(0);
      getCategories();
    }
  };

  const editCategory = (category) => {
    // console.log(category);
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };
  function deleteCategory(category) {
    swal
      .fire({
        title: "This action is permanent?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          getCategories();
        }
      });
  }
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    // console.log(index, property, newName);
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1 className="font-semibold">Categories</h1>
      <label>
        {" "}
        {editedCategory
          ? `Edit Category: ${editedCategory.name}`
          : "New Category"}
      </label>
      <form className="flex gap-3 flex-col" onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            className="font-normal mb-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="mb-0"
            value={parentCategory}
            onChange={(e) => {
              setParentCategory(e.target.value);
            }}
          >
            <option value={0}>no parent category</option>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            className=" bg-gray-800 text-white btn-default"
            type="button"
            onClick={() => {
              addProperty();
            }}
          >
            Add New Property
          </button>

          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  className="mb-0"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button
            className="btn-primary py-1 h-[2.5rem] self-start"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="basic mt-2 ">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-default mr-1 mt-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-red mt-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <CatgoryPage swal={swal} />);
