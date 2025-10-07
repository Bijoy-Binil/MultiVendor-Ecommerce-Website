import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SellerSidebar from "./SellerSidebar";
import { AuthContext } from "../../AuthProvider";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);

  // Category list
  const [categoryData, setCategoryData] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [existingProductFile, setExistingProductFile] = useState(null);
  const [existingProductImgs, setExistingProductImgs] = useState([]);

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

  // Fetch product data for prefill
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}product/${productId}/`);
        const data = res.data;

        setProduct({
          category: data.category || "",
          title: data.title || "",
          vendor: data.vendor || vendorId || "",
          slug: data.slug || "",
          detail: data.detail || "",
          price: data.price || "",
          usd_price: data.usd_price || "",
          tags: data.tags || "",
          image: null,
          demo_url: data.demo_url || "",
          product_file: null,
        });

        setExistingImage(data.image);
        setExistingProductFile(data.product_file);
        setExistingProductImgs(data.product_imgs || []);
        setProductImgs([]);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setErrorMsg("Failed to load product data.");
      }
    };
    fetchProduct();
  }, [productId, vendorId]);

  // Input handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Single file handler
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
      const formData = new FormData();
      for (let key in product) {
        if (product[key] !== null && product[key] !== "") {
          formData.append(key, product[key]);
        }
      }

      // PATCH request to update product
      const res = await axios.patch(`${baseUrl}product/${productId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setSuccessMsg("✅ Product updated successfully!");

        // Upload additional images if any
        if (productImgs.length > 0) {
          for (let i = 0; i < productImgs.length; i++) {
            const imgForm = new FormData();
            imgForm.append("product", productId);
            imgForm.append("image", productImgs[i]);
            await axios.post(`${baseUrl}product-imgs/`, imgForm, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          setImgUploadMsg("✅ Additional images uploaded successfully!");
        }

        // Reset new file inputs
        setProduct({ ...product, image: null, product_file: null });
        setProductImgs([]);
      }
    } catch (err) {
      console.error("Update product error:", err.response?.data || err);
      setErrorMsg("❌ Something went wrong while updating.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-md-3 col-12 mb-3">
          <SellerSidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card shadow-sm border-0">
            <h4 className="card-header bg-primary text-white">Update Product</h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={product.category || ""}
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
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={product.title || ""}
                    onChange={inputHandler}
                    className="form-control"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={product.slug || ""}
                    onChange={inputHandler}
                    className="form-control"
                    required
                  />
                </div>

                {/* Price */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price || ""}
                      onChange={inputHandler}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">USD Price ($)</label>
                    <input
                      type="number"
                      name="usd_price"
                      value={product.usd_price || ""}
                      onChange={inputHandler}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={product.tags || ""}
                    onChange={inputHandler}
                    className="form-control"
                    placeholder="Comma separated tags"
                  />
                </div>

                {/* Demo URL */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Demo URL</label>
                  <input
                    type="url"
                    name="demo_url"
                    value={product.demo_url || ""}
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    name="detail"
                    value={product.detail || ""}
                    onChange={inputHandler}
                    rows={4}
                  />
                </div>

                {/* Main Image */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Main Image</label>
                  {existingImage && (
                    <div className="mb-2">
                      <img
                        src={existingImage}
                        alt="Current Main Product"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <input type="file" name="image" className="form-control" onChange={fileHandler} />
                </div>

                {/* Product File */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Product File</label>
                  {existingProductFile && (
                    <div className="mb-2">
                      <a href={existingProductFile} target="_blank" rel="noopener noreferrer">
                        View Current File
                      </a>
                    </div>
                  )}
                  <input type="file" name="product_file" className="form-control" onChange={fileHandler} />
                </div>

                {/* Additional Images */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Additional Images</label>
                  <div className="d-flex gap-2 mb-2 flex-wrap">
                    {existingProductImgs.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.image} // make sure API returns {image: url}
                        alt={`Product Img ${idx + 1}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                    ))}
                  </div>
                  <input type="file" multiple className="form-control" onChange={multipleImageHandler} />
                </div>

                <button type="submit" className="btn btn-success w-100 fw-bold shadow-sm">
                  Update Product
                </button>
              </form>

              {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
              {imgUploadMsg && <div className="alert alert-info mt-2">{imgUploadMsg}</div>}
              {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
