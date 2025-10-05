import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "./SellerSidebar";
import { AuthContext } from "../../AuthProvider";

const AddProduct = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);

  // Category list
  const [categoryData, setCategoryData] = useState([]);

  // Product main form data
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

  // Image states
  const [productImgs, setProductImgs] = useState([]);

  // Messages
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imgUploadMsg, setImgUploadMsg] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseUrl}categories/`);
        setCategoryData(res.data.results || []);
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

  // Single file handler (image or product file)
  const fileHandler = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setProduct({ ...product, [name]: files[0] });
    }
  };

  // Multiple images handler
  const multipleImageHandler = (e) => {
    setProductImgs([...e.target.files]);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setImgUploadMsg("");

    try {
      // Step 1: Create main product
      const formData = new FormData();
      for (let key in product) {
        if (product[key] !== null && product[key] !== "") {
          formData.append(key, product[key]);
        }
      }

      const res = await axios.post(`${baseUrl}products/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        const productId = res.data.id;
        setSuccessMsg("✅ Product added successfully!");

        // Step 2: Upload multiple images
        if (productImgs.length > 0) {
          for (let i = 0; i < productImgs.length; i++) {
            const imgForm = new FormData();
            imgForm.append("product", productId);
            imgForm.append("image", productImgs[i]);
            await axios.post(`${baseUrl}product-imgs/`, imgForm, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          setImgUploadMsg("✅ Images uploaded successfully!");
        }

        // Reset form
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
        setProductImgs([]);
      }
    } catch (err) {
      console.error("Add product error:", err.response?.data || err);
      setErrorMsg("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-3">
          <SellerSidebar />
        </div>

        {/* Product Form */}
        <div className="col-md-9 col-12">
          <div className="card shadow-sm border-0">
            <h4 className="card-header bg-primary text-white">
              Add New Product
            </h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-bold">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    value={product.category}
                    onChange={inputHandler}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {categoryData.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={inputHandler}
                    className="form-control"
                    id="title"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label fw-bold">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={product.slug}
                    onChange={inputHandler}
                    className="form-control"
                    id="slug"
                    placeholder="unique-slug"
                    required
                  />
                </div>

                {/* Price */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label fw-bold">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={inputHandler}
                      className="form-control"
                      id="price"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="usd_price" className="form-label fw-bold">
                      USD Price ($)
                    </label>
                    <input
                      type="number"
                      name="usd_price"
                      value={product.usd_price}
                      onChange={inputHandler}
                      className="form-control"
                      id="usd_price"
                      required
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label fw-bold">
                    Tags
                  </label>
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
                  <label htmlFor="demo_url" className="form-label fw-bold">
                    Demo URL
                  </label>
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
                  <label htmlFor="detail" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="detail"
                    name="detail"
                    value={product.detail}
                    onChange={inputHandler}
                    rows={4}
                  />
                </div>

                {/* Main Image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label fw-bold">
                    Main Product Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    name="image"
                    onChange={fileHandler}
                    required
                  />
                </div>

                {/* Product File */}
                <div className="mb-3">
                  <label
                    htmlFor="product_file"
                    className="form-label fw-bold"
                  >
                    Product File (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="product_file"
                    name="product_file"
                    onChange={fileHandler}
                  />
                </div>

                {/* Multiple Images */}
                <div className="mb-3">
                  <label
                    htmlFor="product_imgs"
                    className="form-label fw-bold"
                  >
                    Additional Product Images
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="product_imgs"
                    name="product_imgs"
                    multiple
                    onChange={multipleImageHandler}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 fw-bold shadow-sm"
                >
                  Add Product
                </button>
              </form>

              {/* Alerts */}
              {successMsg && (
                <div className="alert alert-success mt-3">{successMsg}</div>
              )}
              {imgUploadMsg && (
                <div className="alert alert-info mt-2">{imgUploadMsg}</div>
              )}
              {errorMsg && (
                <div className="alert alert-danger mt-3">{errorMsg}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
