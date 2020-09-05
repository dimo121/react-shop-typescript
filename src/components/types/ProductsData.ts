export interface IReview {
  comment: string;
  reviewer: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IReview[];
}

export const products: IProduct[] = [
  {
    description:
      "A collection of navigational components that compose declaratively with your app",
    id: 1,
    name: "React Router",
    price: 8,
    reviews: [
      {
        comment: "Excellent! This does everything I want",
        reviewer: "Charles Bronson",
      },
      {
        comment: "Doesn't matter",
        reviewer: "Melany Greenfield",
      },
    ],
  },
  {
    description: "A library that helps manage state across your app",
    id: 2,
    name: "React Redux",
    price: 12,
    reviews: [
      {
        comment: "A stand out tool, very useful",
        reviewer: "John MaCenroe",
      },
    ],
  },
  {
    description: "A library that helps you interact with GraphQL backend",
    id: 3,
    name: "React Apollo",
    price: 12,
    reviews: [
      {
        comment: "Third place is react apollo",
        reviewer: "Brendon Harris",
      },
    ],
  },
];

export const getProduct = async (id: number): Promise<IProduct | null> => {
  await wait(1000);
  const foundProducts = products.filter((product) => product.id === id);
  return foundProducts.length === 0 ? null : foundProducts[0];
};

export const getProducts = async (): Promise<IProduct[]> => {
  await wait(500);
  return products;
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
