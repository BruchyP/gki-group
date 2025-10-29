'use client';
import Link from 'next/link';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import { useCartStore } from '../../store/cartStore'; // עדכני לפי הנתיב שלך
import CartSidebar from '../cart/cartSidebar';

const Header = () => {
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);

  // סכום כל הכמויות בעגלה
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      {/* לוגו כתמונה בלבד */}
      <img src="/logo.png" alt="Logo" className={styles.logo} />

      {/* ניווט הקטגוריות */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>HOME</Link>
        <Link
          href="/category/womens-clothing"
          className={`${styles.link} ${pathname === '/category/womens-clothing' ? styles.activeLink : ''}`}
        >
          Women&apos;s Clothing
        </Link>
        <Link
          href="/category/electronics"
          className={`${styles.link} ${pathname === '/category/electronics' ? styles.activeLink : ''}`}
        >
          Electronics
        </Link>
        <Link
          href="/category/jewelery"
          className={`${styles.link} ${pathname === '/category/jewelery' ? styles.activeLink : ''}`}
        >
          Jewelry
        </Link>
        <Link
          href="/category/mens-clothing"
          className={`${styles.link} ${pathname === '/category/mens-clothing' ? styles.activeLink : ''}`}
        >
          Men&apos;s Clothing
        </Link>
      </nav>

      {/* כפתור עגלת קניות עם מספר */}
      <Link href="/cart" className={styles.cart}>
        CART {totalItems > 0 && <span className={styles.cartCount}>({totalItems})</span>}
      </Link>
            <CartSidebar />
    </header>
  );
};

export default Header;
