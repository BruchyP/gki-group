'use client';
import React from "react";
import styles from "./product.module.css";
import { useCartStore } from "@/app/store/cartStore";

export interface Rating {
  rate: number;
  count: number;
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, title, price, image, quantity: 1 });
  };

  return (
    <div className={styles.productCard}>
      <img
        src={image}
        alt={title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{title}</h2>
      <p className={styles.productCategory}>{category}</p>
      <p className={styles.productPrice}>${price}</p>

      <button
        className={styles.addToCartButton}
        onClick={handleAddToCart}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default Product;

// 'use client';
// import React from "react";
// import styles from "./product.module.css";
// import { useCartStore } from "@/app/store/cartStore";

// export interface Rating {
//   rate: number;
//   count: number;
// }

// // ממשק למוצר
// export interface ProductProps {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: Rating; // שמור בפרופס, אבל לא יוצג עדיין
// }

// const Product: React.FC<ProductProps> = ({
//   title,
//   price,
//   description,
//   category,
//   image,
//   rating, // נשמר בפרופס
// }) => {
//    const addItem = useCartStore((state) => state.addItem);

//   const handleAddToCart = () => {
//     addItem({ id, title, price, image, quantity: 1 });
//   };
//   return (
//     <div className={styles.productCard}>
//       <img
//         src={image}
//         alt={title}
//         className={styles.productImage}
//       />
//       <h2 className={styles.productTitle}>{title}</h2>
//       <p className={styles.productCategory}>{category}</p>
//       <p className={styles.productPrice}>${price}</p>
//       <button
//         className={styles.addToCartButton}
//         onClick={handleAddToCart}
//       >
//         🛒 Add to Cart
//       </button>
//     </div>
//   );
// };

// export default Product;
