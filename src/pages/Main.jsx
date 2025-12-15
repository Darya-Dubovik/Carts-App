import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productsSlice";
import { Button } from "@mui/material";

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
  const products = useSelector((state) => state.products.list);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.thumbnail} />
          <h3>{product.title}</h3>
          <p>{product.category}</p>
          <p>{product.price}$</p>
          <Button size="small" color="secondary" variant="contained">
            <Link to={`/product/${product.id}`}>Подробнее</Link>
          </Button>
          {/* <Link to={`/product/${product.id}`}>Подробнее</Link> */}
        </div>
      ))}
    </div>
  );
}
