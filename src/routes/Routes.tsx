import * as React from "react";
import { Suspense } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AlertPage from "../components/AlertPage";
import ContactUsPage from "../components/ContactUsPage";
import Header from "../components/Header";
import Login from "../components/Login";
import NotFoundPage from "../components/NotFoundPage";
import ProductPage from "../components/ProductPage";
import ProductsPage from "../components/ProductsPage";

const AdminPage = React.lazy(() => import("../components/AdminPage"));

const RoutesWrap: React.SFC = () => {
  return (
    <BrowserRouter>
      <Route component={Routes} />
    </BrowserRouter>
  );
};

const Routes: React.SFC<RouteComponentProps> = (props) => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames="animate"
        >
          <Switch>
            <Redirect exact={true} from="/" to="/products" />
            <Route path="/products" exact={true} component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/login" component={Login} />
            <Route path="/admin">
              {loggedIn ? (
                <Suspense
                  fallback={<div className="page-container">Loading ...</div>}
                >
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/alert" component={AlertPage} />
            <Route path="/contactus" component={ContactUsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RoutesWrap;
