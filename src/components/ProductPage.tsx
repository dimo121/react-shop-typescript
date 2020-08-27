import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct, products } from './ProductsData';
import Product from './Product';

type Props = RouteComponentProps<{ id: string }>;

interface IState {
    product?: IProduct;
    added: boolean;
}

class ProductPage extends React.Component<Props, IState> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            added: false
        };
    }

    public componentDidMount() {
        console.log(this.props.match.params.id);
        if (this.props.match.params.id) {
            const id: number = parseInt(this.props.match.params.id, 10);
            const product = products.filter(p => p.id === id)[0];

            this.setState({ product });
        }
    }

    private handleAddClick = () => {
        this.setState({ added: true });
    }

    public render() {
        const product = this.state.product;
        return (
            <div className='page-container'>
                {product ? (
                    <Product    product={product}
                                inBasket={this.state.added}
                                onAddToBasket={this.handleAddClick} />
                ) : (
                        <p>Product not found!</p>
                    )}
            </div>
        );
    }
}

export default ProductPage;