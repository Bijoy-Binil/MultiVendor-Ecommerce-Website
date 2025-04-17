// App.js or Navbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './app.css'

function EcommerceNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold text">
          MultiVendor<span className="text-primary ">Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Left Side Nav */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>

            <NavDropdown title="Vendors" id="vendors-dropdown">
              <NavDropdown.Item href="/vendors">All Vendors</NavDropdown.Item>
              <NavDropdown.Item href="/vendor/register">Become a Vendor</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categories" id="categories-dropdown">
              <NavDropdown.Item href="/category/electronics">Electronics</NavDropdown.Item>
              <NavDropdown.Item href="/category/fashion">Fashion</NavDropdown.Item>
              <NavDropdown.Item href="/category/home">Home & Living</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/deals">Deals</Nav.Link>
          </Nav>

          {/* Right Side Nav */}
          <Nav className="ms-auto">
            <Nav.Link href="/cart">🛒 Cart</Nav.Link>
            <NavDropdown title="Account" id="account-dropdown" align="end">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EcommerceNavbar;
