'use client';
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image} width={50} />
          <p>{item.title}</p>
          <p>₪{item.price}</p>

          <div>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>

          <button onClick={() => removeItem(item.id)}>הסר</button>
        </div>
      ))}
      {cart.length > 0 && <button onClick={clearCart}>נקה עגלה</button>}
    </div>
  );
}
