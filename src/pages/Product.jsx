import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function Product() {
  const { id } = useParams(); // получаем id из /product/:id
  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === Number(id))
  );

  if (!product) return <p>Товар не найден</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Цена: {product.price}$</p>
    </div>
  );
}
