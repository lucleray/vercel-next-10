import * as faker from "faker";
import { ProductInterface } from "../interfaces/product.interface";

faker.seed(37);

const products: ProductInterface[] = Array(10000)
  .fill({})
  .map((item, index) => {
    return { slug: `product-${index}`, name: faker.random.word(), description: faker.random.words(faker.random.number(1000)) };
  });

export const findAll = (): ProductInterface[] => {
  return products;
};

export const findOneBySlug = (slug: string): ProductInterface | null => {
  const p = products.filter((p) => p.slug === slug);

  return p.length ? p[0] : null;
};
