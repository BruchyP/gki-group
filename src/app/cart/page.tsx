'use client';
import { useCartStore } from "../store/cartStore";
import styles from "./cart.module.css";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is currently empty.</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.details}>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>

                  <div className={styles.quantity}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <p className={styles.total}>Total: ${total.toFixed(2)}</p>
            <div className={styles.actions}>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
