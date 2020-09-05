import * as React from "react";
import { connect } from "react-redux";
import BasketSummary from "../components/BasketSummary";
import "url-search-params-polyfill";
import { IApplicationState } from "./Store";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps {
  basketCount: number;
}

interface IState {
  search: string;
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      search: "",
    };
  }

  public componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const search = searchParams.get("search") || "";
    this.setState({ search });
  }

  private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.currentTarget.value,
    });
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.history.push(`/products?search=${this.state.search}`);
    }
  };

  public render() {
    return (
      <header className="header">
        <h1 className="header-title">React Router with typescript</h1>
        <span>
          <div className="search-container">
            <input
              type="search"
              value={this.state.search}
              placeholder="search"
              onChange={this.handleSearchChange}
              onKeyDown={this.handleKeyDown}
            />
            <BasketSummary count={this.props.basketCount} />
          </div>
          <NavLink
            className="header-link"
            activeClassName="header-link-active"
            to="/products"
          >
            Products
          </NavLink>
          <NavLink
            className="header-link"
            activeClassName="header-link-active"
            to="/admin"
          >
            Admin
          </NavLink>
          <NavLink
            className="header-link"
            activeClassName="header-link-active"
            to="/alert"
          >
            Alert
          </NavLink>
          <NavLink
            className="header-link"
            activeClassName="header-link-active"
            to="/contactus"
          >
            Contact
          </NavLink>
        </span>
      </header>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    basketCount: store.basket.products.length,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
