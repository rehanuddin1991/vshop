"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null); // Track the row being edited

  const [formData, setFormData] = useState({
    ProductName: "",
    ProductCode: "",
    Qty: "",
    Img: "",
    UnitPrice: "",
    TotalPrice: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();
  // Fetch product data from the API

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://crud.teamrabbil.com/api/v1/ReadProduct"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!editingRow) return;

    try {
      const response = await fetch(
        `https://crud.teamrabbil.com/api/v1/UpdateProduct/${editingRow._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Update successful!");         
        fetchProducts();
        setEditingRow(null);
        setFormData({
          ProductName: "",
          ProductCode: "",
          Qty: "",
          Img: "",
          UnitPrice: "",
          TotalPrice: "",
        }); // Reset form data
      } else {
        setMessage("Update failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputOnChange = (name, value) => {
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setFormData({
      ProductName: row.ProductName,
      ProductCode: row.ProductCode,
      Qty: row.Qty,
      UnitPrice: row.UnitPrice,
      TotalPrice: row.TotalPrice,
      Img: row.Img,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete
  async function handleDelete(productId) {
    try {
      const response = await fetch(
        `https://crud.teamrabbil.com/api/v1/DeleteProduct/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[darkcyan] font-bold text-lg">
              <th>Img</th>
              <th>Name</th>
              <th>code</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.Img} alt="Img" />
                      </div>
                    </div>
                  </div>
                </td>
                <td> {product.ProductName} </td>
                <td> {product.ProductCode} </td>
                <td> {product.Qty} </td>
                <td> {product.UnitPrice} </td>
                <td> {product.TotalPrice} </td>
                <td>
                  <button onClick={() => handleEdit(product)}>
                    <MdEdit size={39} />
                  </button>
                  <button onClick={() => handleDelete(product._id)}>
                    <MdDelete size={39} />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRow && (
        <div className="hero bg-base-200 shadow-2xl absolute z-10  top-0 left-0  ">
          <div className="hero-content  max-w-[50rem] ">
            <div className="card bg-base-100   max-w-[50rem]   shadow-2xl">
              <legend className="text-[blue] font-bold m-1 p-1 text-lg text-center">
                Create Product
              </legend>
              <form
                className="  top-0 card-body items-center justify-center gap-4   grid grid-cols-1 lg:grid-cols-2"
                onSubmit={handleSubmitUpdate}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Product Name{" "}
                      <span className="text-[red] font-bold">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.ProductName}
                    onChange={(e) => {
                      inputOnChange("ProductName", e.target.value);
                    }}
                    placeholder="Input Product Name"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Product Code{" "}
                      <span className="text-[red] font-bold">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.ProductCode}
                    onChange={(e) => {
                      inputOnChange("ProductCode", e.target.value);
                    }}
                    placeholder="Input Product Code"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Image <span className="text-[red] font-bold">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.Img}
                    onChange={(e) => {
                      inputOnChange("Img", e.target.value);
                    }}
                    placeholder="Input Image URL"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Unit Price <span className="text-[red] font-bold">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.UnitPrice}
                    onChange={(e) => {
                      inputOnChange("UnitPrice", e.target.value);
                    }}
                    placeholder="Input Unit Price"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Quantity <span className="text-[red] font-bold">*</span>{" "}
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.Qty}
                    onChange={(e) => {
                      inputOnChange("Qty", e.target.value);
                    }}
                    placeholder="Input qty"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">
                      Total Price{" "}
                      <span className="text-[red] font-bold">*</span>{" "}
                    </span>
                  </label>
                  <input
                    type="number"
                    value={formData.TotalPrice}
                    onChange={(e) => {
                      inputOnChange("TotalPrice", e.target.value);
                    }}
                    placeholder="Input  total price"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="Update">
                    {loading ? "Updating..." : "Update"}
                    <br />
                  </button>{" "}
                  <span className="label-text">
                    {message && <p style={{ color: "red" }}>{message}</p>}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
