import {create} from "zustand";
import { ProductProps } from "../components/product/product";

interface ProductsStore {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
