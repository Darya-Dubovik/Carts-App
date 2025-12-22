import { PRODUCTS_URL } from "../constants/api.js";

export async function getProducts() {
  const res = await fetch(PRODUCTS_URL);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  if (data.length === 0) {
    throw new Error("Данные отсутствуют");
  } else if (!Array.isArray(data)) {
    throw new Error("Ошибка формата данных");
  }
  return data;
}
