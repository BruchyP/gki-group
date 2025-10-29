import Link from 'next/link'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        HOME
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/category/womens-clothing" className={styles.link}>
          Women&apos;s Clothing
        </Link>
        <Link href="/category/electronics" className={styles.link}>
          Electronics
        </Link>
        <Link href="/category/jewelery" className={styles.link}>
          Jewelry
        </Link>
        <Link href="/category/mens-clothing" className={styles.link}>
          Men&apos;s Clothing
        </Link>
      </nav>

      <Link href="/cart" className={styles.cart}>
        CART
      </Link>
    </header>
  )
}

export default Header
