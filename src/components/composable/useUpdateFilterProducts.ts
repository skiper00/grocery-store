import type { ISProduct } from "../../../types/product";
import { type Ref } from "vue";

export const useUpdateFilterProducts = (filteredProducts:Ref<ISProduct[]>, currentPage:Ref<number>) => {
  const updateFilteredProducts = (filtered: ISProduct[]) => {
    filteredProducts.value = filtered;
    currentPage.value = 1;
  }

  return {
    updateFilteredProducts
  }
}
