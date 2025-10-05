import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "./SellerSidebar";
import { AuthContext } from "../../AuthProvider";

const AddProduct = () => {
  const baseUrl = "http://127.0.0.1:8000/api/"; 
  const { vendorId } = useContext(AuthContext);

  // Category list
  const [categoryData, setCategoryData] = useState([]);

  // Product state
  const [product, setProduct] = useState({
    category: "",
    title: "",
    vendor: vendorId || "",
    slug: "",
    detail: "",
    price: "",
    usd_price: "",
    tags: "",
    image: null,
    demo_url: "",
    product_file: null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseUrl}categories/`);
        setCategoryData(res.data.results);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Update vendor in state when context changes
  useEffect(() => {
    setProduct((prev) => ({ ...prev, vendor: vendorId || "" }));
  }, [vendorId]);

  // Input handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // File handler
  const fileHandler = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setProduct({ ...product, [name]: files[0] });
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("vendor", product.vendor);
      formData.append("category", product.category);
      console.log("Product==>",product)
      for (let key in product) {
        if (key !== "vendor" && key !== "category" && product[key] !== null) {
          formData.append(key, product[key]);
        }
      }

      const res = await axios.post(`${baseUrl}products/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        setSuccessMsg("✅ Product added successfully!");
        setErrorMsg("");
        setProduct({
          category: "",
          title: "",
          vendor: vendorId || "",
          slug: "",
          detail: "",
          price: "",
          usd_price: "",
          tags: "",
          image: null,
          demo_url: "",
          product_file: null,
        });
      } else {
        setErrorMsg("❌ Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err.response?.data || err);
      setErrorMsg("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Add Products</h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={product.category}
                    onChange={inputHandler}
                  >
                    <option value="">-- Select --</option>
                    {categoryData.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    value={product.title}
                    name="title"
                    onChange={inputHandler}
                    className="form-control"
                    id="title"
                  />
                </div>

                {/* Slug */}
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">Slug</label>
                  <input
                    type="text"
                    value={product.slug}
                    name="slug"
                    onChange={inputHandler}
                    className="form-control"
                    id="slug"
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={inputHandler}
                    className="form-control"
                    id="price"
                  />
                </div>

                {/* USD Price */}
                <div className="mb-3">
                  <label htmlFor="usd_price" className="form-label">USD Price</label>
                  <input
                    type="number"
                    name="usd_price"
                    value={product.usd_price}
                    onChange={inputHandler}
                    className="form-control"
                    id="usd_price"
                  />
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={product.tags}
                    onChange={inputHandler}
                    className="form-control"
                    id="tags"
                    placeholder="Comma separated tags"
                  />
                </div>

                {/* Demo URL */}
                <div className="mb-3">
                  <label htmlFor="demo_url" className="form-label">Demo URL</label>
                  <input
                    type="url"
                    name="demo_url"
                    value={product.demo_url}
                    onChange={inputHandler}
                    className="form-control"
                    id="demo_url"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="detail" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="detail"
                    name="detail"
                    value={product.detail}
                    onChange={inputHandler}
                    rows={5}
                  />
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Product Image</label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    name="image"
                    onChange={fileHandler}
                  />
                </div>

                {/* Product File */}
                <div className="mb-3">
                  <label htmlFor="product_file" className="form-label">Product File</label>
                  <input
                    className="form-control"
                    type="file"
                    id="product_file"
                    name="product_file"
                    onChange={fileHandler}
                  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>

              {/* Alerts */}
              {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
              {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
