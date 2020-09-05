import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { ProductsReducer } from "./reducers/ProductsReducer";
import { IProductsState } from "./types/ProductsTypes";
import { BasketReducer } from "./reducers/BasketReducer";
import { IBasketState } from "./types/BasketTypes";

export interface IApplicationState {
  products: IProductsState;
  basket: IBasketState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: ProductsReducer,
  basket: BasketReducer,
});

export default function configureStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
