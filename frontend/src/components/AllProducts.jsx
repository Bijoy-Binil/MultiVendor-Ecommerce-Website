import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import { Link } from "react-router-dom"

const AllProducts = () => {
  const baseUrl = "http://127.0.0.1:8000/api/products/"
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  const fetchData =  (baseUrl) => {
  fetch(baseUrl)
  .then((response)=> response.json())
  .then((data)=>{
    setProducts(data.results)
    setTotal(data.count)
    console.log("fetchDataBaseUrl==> ",baseUrl)
  })
 
    
  }
  useEffect(() => {
    fetchData(baseUrl)
    
  }, [])

  // pagination (simple)
  let pages = []
  if (total > 0 && products.length > 0) {
    let pageCount = Math.ceil(total / products.length)
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li key={i} className="page-item">
          <Link
            className="page-link"
            to="#"
            onClick={() => fetchData(`${baseUrl}?page=${i}`)}
          >
            {i}
          </Link>
        </li>
      )
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="fw-bold text-primary mb-4">All Products</h4>

      <div className="row mb-4">
        {products?.map((p, i) => (
          <SingleProduct key={i} product={p} />
        ))}
      </div>

      {pages.length > 0 && (
        <nav>
          <ul className="pagination">{pages}</ul>
        </nav>
      )}
    </div>
  )
}

export default AllProducts
