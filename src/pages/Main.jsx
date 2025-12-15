import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productsSlice";

export function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setProducts(data.products));
      });
  }, []);
  const products = useSelector((state) => state.products.list); // или useGetProductsQuery

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price}$</p>
          <Link to={`/product/${product.id}`}>Подробнее</Link>
        </div>
      ))}
    </div>
  );
}
