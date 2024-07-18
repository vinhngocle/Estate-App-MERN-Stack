import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../interfaces/Product.interface";

interface CardProps {
  product: IProduct;
  addToCart: (Product: IProduct) => void;
  removeToCart: (id: number) => void;
}

function Card({ product, addToCart, removeToCart }: CardProps) {
  const location = useLocation();
  const [isCart, setIsCart] = useState(false);
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/cart") {
      setIsCart(true);
    } else {
      setIsCart(false);
    }
  }, [pathname]);

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
          {!isCart && (
            <button
              onClick={() => addToCart(product)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Add to Card</span>
              <i className="fa-solid fa-plus pl-2"></i>
            </button>
          )}

          {isCart && (
            <button
              onClick={() => removeToCart(product.id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <span>Remove card</span>
              <i className="fa-solid fa-trash pl-2"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
