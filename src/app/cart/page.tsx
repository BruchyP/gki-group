'use client';
import { useCartStore } from '@/app/store/cartStore';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div style={{ padding: 30 }}>🛒 Your cart is empty</div>;
  }

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: '0 auto' }}>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ddd',
            padding: '10px 0',
          }}
        >
          {/* תמונה */}
          <img src={item.image} alt={item.title} width={80} height={80} />

          {/* שם ומחיר */}
          <div style={{ flexGrow: 1, marginLeft: 15 }}>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
            <p style={{ margin: 0 }}>₪{item.price.toFixed(2)}</p>
          </div>

          {/* כפתורי כמות */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>

          {/* מחיקה */}
          <button onClick={() => removeItem(item.id)}>❌</button>
        </div>
      ))}

      <h2 style={{ marginTop: 20 }}>Total: ₪{total.toFixed(2)}</h2>

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={clearCart}>Clear Cart</button>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
}
