import React from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import styles from "../../styles/Home.module.css";
import { findAll, findOneBySlug } from "../../queries/products.query";
import { ProductInterface } from "../../interfaces/product.interface";

export type ProductPageProps = {
  product: ProductInterface;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = findAll();

  return {
    paths: products.map((p) => {
      return {
        params: {
          slug: p.slug,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params.slug as string;
  const product = findOneBySlug(slug);

  return {
    props: {
      product,
    },
    revalidate: true,
  };
};

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  if (!product || router.isFallback) {
    return <p className={styles.description}>Product does not exist</p>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.description}>
        Back to{" "}
        <Link href={"/products"} passHref={true}>
          <a>Products</a>
        </Link>{" "}
        page
      </p>
    </main>
  );
}
