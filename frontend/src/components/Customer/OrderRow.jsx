import axios from "axios";  
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderRow = ({ index, keys, item }) => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [totalDownloads, setTotalDownloads] = useState(item.product_info.downloads || 0);
  const [downloadClicked, setDownloadClicked] = useState(false);
  let navigate = useNavigate();

  // Function to handle download click
  const countDownloads = async (product_id) => {
    setDownloadClicked(true);
    try {
      const response = await axios.post(`${baseUrl}/update_product_download_count/${product_id}/`);
      if (response.data.bool) {
        setTotalDownloads((prev) => prev + 1);
        window.open(item.product_info.product_file, "_blank");
      }
      console.log("Response => ", response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadClicked(false);
    }
  };

  // Optional: useEffect to sync initial downloads from props if they change
  useEffect(() => {
    setTotalDownloads(item.product_info.downloads || 0);
  }, [item.product_info.downloads]);

  return (
    <tr key={keys}>
      <td className="text-center fw-semibold">{index + 1}</td>
      <td>
        <div className="d-flex align-items-center">
          <Link to={`/product/${item.product_info.slug}/${item.product_info.id}`}>
            <img
              src={item.product_info.image}
              className="img-fluid rounded me-3 border"
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
              alt="Product"
            />
          </Link>
          <Link
            to={`/product/${item.product_info.slug}/${item.product_info.id}`}
            className="text-decoration-none text-dark fw-semibold"
          >
            {item.product_info.title}
          </Link>
        </div>
      </td>
      <td className="text-end fw-bold text-success">₹{item.price}</td>
      <td className="text-center">
        {item.order_info.order_status ? (
          <span className="badge bg-success px-3 py-2">
            <i className="fa fa-check-circle me-1"></i> Completed
          </span>
        ) : (
          <span className="badge bg-warning text-dark px-3 py-2">
            <i className="fa fa-spinner fa-spin me-1"></i> Pending
          </span>
        )}
      </td>
      <td className="text-center">
        {item.order_info.order_status ? (
          <button
            onClick={() => countDownloads(item.product_info.id)}
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
            disabled={downloadClicked}
          >
            <i className="fa fa-download me-1"></i> Download{" "}
            <span className="badge text-dark bg-white">{totalDownloads}</span>
          </button>
        ) : (
          <button className="btn btn-outline-secondary  btn-sm" disabled>
            <i className="fa fa-clock me-1"></i> Awaiting
          </button>
        )}
        {item.order_info.order_status && <Link to={`/customer/product-rating/${item.product_info.id}`} className="btn mx-2 btn-outline-success btn-sm" >
            Add Review
          </Link>}
      </td>
    </tr>
  );
};

export default OrderRow;
