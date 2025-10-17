import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import SellerSidebar from "./SellerSidebar";
import { AuthContext } from "../../AuthProvider";

const MonthlyReport = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId } = useContext(AuthContext);

  // Store backend data
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch monthly data when vendorId is available
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${baseUrl}vendor/${vendorId}/monthly-report/`);
        const data = Array.isArray(res.data) ? res.data : [];
        setReport(data);
      } catch (error) {
        console.error("Error fetching monthly report:", error);
        setErrorMsg("Unable to load monthly report. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) fetchReport();
  }, [vendorId]);

  // Prepare data for the chart
  const months = report.map((item) => item.month);
  const totalOrders = report.map((item) => item.total_orders);
  const totalRevenue = report.map((item) => parseFloat(item.total_amount));
  const totalProducts = report.map((item) => item.total_products_sold);

  // Chart configuration
  const chartOptions = {
    chart: {
      id: "monthly-report",
      toolbar: { show: true },
    },
    xaxis: {
      categories: months,
      title: { text: "Month" },
    },
    yaxis: [
      { title: { text: "Orders / Products Sold" } },
      { opposite: true, title: { text: "Revenue (INR)" } },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: { position: "top" },
  };

  const series = [
    { name: "Total Orders", data: totalOrders },
    { name: "Products Sold", data: totalProducts },
    { name: "Revenue (₹)", data: totalRevenue },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12">
          <SellerSidebar />
        </div>

        {/* Report Section */}
        <div className="col-md-9 col-12">
          <h3 className="mb-3 text-center">📅 Monthly Report</h3>

          {loading ? (
            <p>Loading report...</p>
          ) : errorMsg ? (
            <p className="text-danger">{errorMsg}</p>
          ) : report.length === 0 ? (
            <p>No monthly report data available.</p>
          ) : (
            <div className="card p-3 shadow-sm">
              <Chart
                options={chartOptions}
                series={series}
                type="bar"
                height={400}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
