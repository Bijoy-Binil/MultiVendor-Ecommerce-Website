import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SwiperReact from "./components/SwiperReact";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
 
      <Footer />
    </>
  );
}

export default App;
