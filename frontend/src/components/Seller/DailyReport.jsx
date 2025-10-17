import React, { useContext, useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import Chart from "react-apexcharts";

const DailyReport = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);

  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await axios.get(`${baseUrl}vendor/${vendorId}/daily-report/`);
        setReport(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load daily report.");
      } finally {
        setLoading(false);
      }
    }
    if (vendorId) fetchReport();
  }, [vendorId]);

  // Prepare chart data
  const dates = report.map(r => r.order_date);
  const orders = report.map(r => r.total_orders);
  const products = report.map(r => r.total_products_sold);
  const revenue = report.map(r => parseFloat(r.total_amount));

  const chartOptions = {
    chart: { id: "daily-report" },
    xaxis: { categories: dates },
    yaxis: [
      { title: { text: "Orders / Products" } },
      { opposite: true, title: { text: "Revenue" } }
    ],
    tooltip: { shared: true, intersect: false }
  };

  const series = [
    { name: "Orders", data: orders },
    { name: "Products Sold", data: products },
    { name: "Revenue", data: revenue }
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <h4>Daily Report</h4>

          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && report.length === 0 && <p>No data available.</p>}
          {!loading && report.length > 0 && (
            <Chart options={chartOptions} series={series} type="bar" height={400} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
