'use client';
import { useCartStore } from '@/app/store/cartStore';
import styles from './cartSidebar.module.css';
import Link from 'next/link';

export default function CartSidebar() {
  const { cart, isOpen, toggleCart, updateQuantity } = useCartStore();

  if (!isOpen) return null;

  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // מספר המוצרים בסל

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleCart(false)} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>Cart ({totalItems})</h2> {/* כאן מציגים את מספר המוצרים */}
          <button onClick={() => toggleCart(false)}>✖</button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            <p className={styles.total}>Total: ${totalPrice}</p>
            <div className={styles.actions}>
              {/* אפשר להוסיף כפתורים פה כמו Checkout או Clear Cart */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
