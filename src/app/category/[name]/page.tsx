'use client';
import { useParams } from "next/navigation";
import { useProductsStore } from "../../store/productsStore";
import { useEffect } from "react";
import Product from "../../components/product/product";
import styles from "./category.module.css";

// פונקציה שמנרמלת את שם הקטגוריה ל-slug תואם ל-URL
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/['"]/g, "")           // מוחק גרשיים
    .replace(/\s+/g, "-")           // רווחים => מקף
    .replace(/[^a-z0-9-]/g, "")     // מסיר תווים לא חוקיים
    .replace(/-+/g, "-")            // מנקה מקפים כפולים
    .replace(/(^-|-$)/g, "");       // מסיר מקפים בהתחלה ובסוף
}

export default function CategoryPage() {
  const params = useParams<{ name: string }>();
  const { products, setProducts } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [products, setProducts]);

  if (products.length === 0) return <p>Loading products...</p>;

  // מסנן לפי שם הקטגוריה מתוך הנתיב (slug)
  const categoryProducts = products.filter(
    (p) => slugify(p.category) === params.name
  );

  return (
    <div className={styles.container}>
      {categoryProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        categoryProducts.map((p) => (
          // <Product
          //   key={p.id}
          //   image={p.image}
          //   title={p.title}
          //   description={p.description}
          //   category={p.category}
          //   price={p.price}
          // />
          <Product
            key={p.id}
            id={p.id}             // <-- שדה חסר
            image={p.image}
            title={p.title}
            description={p.description}
            category={p.category}
            price={p.price}
            rating={p.rating}     // <-- שדה חסר
          />

        ))
      )}
    </div>
  );
}
