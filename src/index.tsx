import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/styles.scss';
import Routes from './routes/Routes';


ReactDOM.render(
  <Routes />,
  document.getElementById("root") as HTMLElement
);
