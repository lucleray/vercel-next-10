import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

import { ProductInterface } from "../interfaces/product.interface";
import styles from "../styles/Home.module.css";
import { findAll } from "../queries/products.query";

export type ProductsPageProps = {
  products: ProductInterface[];
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: findAll(),
    },
  };
};

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((p, i) => (
          <Link key={p.slug} href={`/products/${p.slug}`} passHref={true}>
              <a className={styles.item}>
                  #{i} {p.name}
              </a>
          </Link>
        ))}
      </div>
    </main>
  );
}
