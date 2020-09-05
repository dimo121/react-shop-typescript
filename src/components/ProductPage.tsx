import * as React from "react";
import { connect } from "react-redux";
import { addToBasket } from "./actions/BasketActions";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { IProduct } from "./types/ProductsData";
import { getSingleProduct } from "./actions/ProductsActions";
import Product from "./Product";
import { IApplicationState } from "./Store";

interface IProps extends RouteComponentProps<{ id: string }> {
  addToBasket: typeof addToBasket;
  getSingleProduct: typeof getSingleProduct;
  loading: boolean;
  product?: IProduct;
  added: boolean;
}

class ProductPage extends React.Component<IProps> {
  public componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      this.props.getSingleProduct(id);
    }
  }

  private handleAddClick = () => {
    if (this.props.product) {
      this.props.addToBasket(this.props.product);
    }
  };

  private navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  public render() {
    const product = this.props.product;
    return (
      <div className="page-container">
        <Prompt when={!this.props.added} message={this.navAwayMessage} />
        {product || this.props.loading ? (
          <Product
            loading={this.props.loading}
            product={product}
            inBasket={this.props.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
  getSingleProduct: (id: number) => dispatch(getSingleProduct(id)),
});

const mapStateToProps = (store: IApplicationState) => ({
  added: store.basket.products.some((p) =>
    store.products.currentProduct
      ? p.id === store.products.currentProduct.id
      : false
  ),
  basketProducts: store.basket.products,
  loading: store.products.productsLoading,
  product: store.products.currentProduct || undefined,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
