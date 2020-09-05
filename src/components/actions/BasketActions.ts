import { BasketActionTypes, IBasketAdd } from "../types/BasketTypes";
import { IProduct } from "../types/ProductsData";

export const addToBasket = (product: IProduct): IBasketAdd => ({
  product,
  type: BasketActionTypes.ADD,
});
