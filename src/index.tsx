import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/styles.scss";
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./components/Store";
import { IApplicationState } from "./components/Store";

interface IProps {
  store: Store<IApplicationState>;
}

const Root: React.SFC<IProps> = (props) => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root") as HTMLElement
);
