import style from './Hero.module.css';
import Link from 'next/link';
import css from '../../Home.module.css';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className={style.section} id="hero" aria-label="Hero section">
      <div className={style.backgroundImage} aria-hidden="true"></div>
      <div className={css.container}>
        <div className={style.content}>
          <h1 className={style.title}>Find your perfect rental car</h1>
          <p className={style.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link
            className={style.button}
            href="/catalog"
            aria-label="Go to catalog page"
          >
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
