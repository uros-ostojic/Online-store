import "./homePage.css";
import React, { useState, useEffect } from "react";
import Card from "./../../components/Card/Card";

const HomePage = () => {
  const [counter, setCounter] = useState(0);

  const [products, setProducts] = useState([]);
  const getAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json)); // seter stejta products
  };

  const [categories, setCategories] = useState([]);
  const getAllCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const getProductsByCategory = (currentCategory) => {
    fetch("https://fakestoreapi.com/products/category/" + currentCategory)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllCategories();
  }, []); // useEffect sluzi da pri load-u fetch-uje, bez da ga pozivas na click

  useEffect(() => {
    getAllProducts();
  }, [counter]); // counter je defoult 0, kad mu dodam 1 vrednost mu se menja i sve u useEffect se izvrsi

  return (
    <>
      <div className="main">
        <div className="categories">
          {/* <button onClick={() => setCounter(counter + 1)}>All Products</button> */}
          <button onClick={getAllProducts}>All Products</button>
          {categories.map((category) => (
            <button onClick={() => getProductsByCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        {/* <div className="products"> 
        {products.map((e) => <Card cards={e} key={e.id} />)}
          </div> */}
        <div className="allProducts">
          {products.map((all) => (
            <Card allCards={all} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
