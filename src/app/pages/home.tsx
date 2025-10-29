'use client';
import { useEffect } from "react";
import Product, { ProductProps } from "../components/product/product";
import styles from "./home.module.css";
import { useProductsStore } from "../store/productsStore";
export default function HomePage() {
  const {products, setProducts} = useProductsStore();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
     .then(res => res.json())
      .then((data: ProductProps[]) => setProducts(data))
      .catch(err => console.error(err));
  }, [setProducts]);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
