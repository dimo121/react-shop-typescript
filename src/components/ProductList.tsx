import * as React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "./types/ProductsData";
import withLoader from "./withLoader";

interface IProps {
  products?: IProduct[];
  search: string;
}

const ProductList: React.SFC<IProps> = (props) => {
  const search = props.search;
  return (
    <ul className="product-list">
      {props.products &&
        props.products.map((item) => {
          if (
            !search ||
            (search &&
              item.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
          ) {
            return (
              <li key={item.id} className="product-list-item">
                <Link to={`/products/${item.id}`}>{item.name}</Link>
              </li>
            );
          } else {
            return null;
          }
        })}
    </ul>
  );
};

export default withLoader(ProductList);
