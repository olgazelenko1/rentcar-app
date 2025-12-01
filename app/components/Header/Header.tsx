import Link from 'next/link';
import css from './Header.module.css';
import styles from '../../Home.module.css';

export default function Header() {
  return (
    <header className={css.header} role="banner">
      <div className={`container ${styles.container} ${css.headerInner}`}>
        <Link className={css.headerLinkLogo} href="/">
          <div className={css.logo_icon}>
            <svg
              className={css.logo_iconSvg}
              width="104"
              height="16"
              role="img"
              aria-labelledby="rental-logo-title"
            >
              <title id="rental-logo-title">RentalCar logo</title>
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </div>
        </Link>
        {/* Навігація */}
        <nav className={css.nav}>
          <Link className={css.navLink} href="/">
            Home
          </Link>
          <Link className={css.navLink} href="/catalog">
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
