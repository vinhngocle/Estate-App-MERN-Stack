import Card from "./Card";
import { IProduct } from "../../interfaces/Product.interface";

interface ListProductProps {
  products: IProduct[];
  addToCart: (product: IProduct) => void;
  removeToCart: (id: number) => void;
}

function ListProduct({ products, addToCart, removeToCart }: ListProductProps) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 sm:mx-auto sm:content-center sm:gap-4">
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={() => addToCart(product)}
              removeToCart={() => removeToCart(product.id)}
            />
          );
        })}
      </div>
    </>
  );
}

export default ListProduct;
