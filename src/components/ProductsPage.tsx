import * as React from "react";
import { IProduct } from "./types/ProductsData";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";
import ProductList from "./ProductList";
import { getAllProducts } from "./actions/ProductsActions";
import "url-search-params-polyfill";

// interface IState {
//     products: IProduct[];
//     search: string;
// } state comes from redux store

interface IProps extends RouteComponentProps {
  getProducts: typeof getAllProducts;
  loading: boolean;
  products: IProduct[];
}

class ProductsPage extends React.Component<IProps> {
  public async componentDidMount() {
    this.props.getProducts();
  }

  public render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const search = searchParams.get("search") || "";

    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ProductList
          search={search}
          products={this.props.products}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.products.productsLoading,
    products: store.products.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
