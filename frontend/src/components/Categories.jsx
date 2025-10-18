import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Categories = () => {
  const baseUrl = "http://127.0.0.1:8000/api/categories/"
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)

  const fetchData = (baseUrl) => {
    fetch(baseUrl)
    .then((resposne)=>(resposne.json()))
    .then((data)=>{
      setCategories(data.results)
      setTotal(data.count)
    })
  }
  useEffect(() => {
    fetchData(baseUrl)
  }, [])

  // pagination
  let pages = []
  if (total > 0 && categories.length > 0) {
    let pageCount = Math.ceil(total / categories.length)
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
      <h4 className="fw-bold text-primary mb-4">All Categories</h4>

      <div className="row mb-4">
        {categories?.map((c, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div
                className="position-relative overflow-hidden"
                style={{ height: "200px" }}
              >
                {c.image ? (
                  <img
                    src={c.image}
                    className="card-img-top h-100 object-fit-cover"
                    alt={c.title}
                    style={{ transition: "transform 0.3s" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                ) : (
                  <div 
                    className="card-img-top h-100 d-flex align-items-center justify-content-center bg-light"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                  >
                    <div className="text-center">
                      <i className="fas fa-tags" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                      <h5 className="mb-0">{c.title}</h5>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title fw-bold">
                  <Link to={`/category/${c.title}/${c.id}`}>{c.title}</Link>
                </h5>
                <p className="text-secondary mb-0">Products in this category</p>
              </div>
            </div>
          </div>
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

export default Categories
