import React from "react";

interface Product {
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  // Add other properties of the product here if needed
}

interface CardProps {
  product: Product;
}

function Card({ product }: CardProps) {
  return (
    <div className="py-2 px-2">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg h-80 w-full bg-contain bg-center"
            src={product.image}
            alt=""
          />
        </a>
        <div className="p-5 h-[400px] ">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-3 h-[100px]">
              {product.title}
            </h5>
          </a>
          <p className="mb-3 font-bold text-3xl text-right dark:text-gray-400">
            ${product.price}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
            {product.description}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to Card
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
