import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  getProducts as getProductsFromAPI,
  getProduct as getProductFromAPI,
} from "../types/ProductsData";
import {
  IProductsGetAllAction,
  IProductsLoadingAction,
  IProductsGetSingleAction,
  IProductsState,
  ProductsActionTypes,
} from "../types/ProductsTypes";

const loading: ActionCreator<IProductsLoadingAction> = () => {
  return {
    type: ProductsActionTypes.LOADING,
  };
};

export const getAllProducts: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IProductsGetAllAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const products = await getProductsFromAPI();
    return dispatch({
      products,
      type: ProductsActionTypes.GETALL,
    });
  };
};

export const getSingleProduct: ActionCreator<ThunkAction<
  Promise<any>,
  IProductsState,
  null,
  IProductsGetSingleAction
>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const product = await getProductFromAPI(id);
    dispatch({
      product,
      type: ProductsActionTypes.GETSINGLE,
    });
  };
};
