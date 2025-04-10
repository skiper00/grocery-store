import type { InProduct } from "../../../types/product";
import { type Ref } from "vue";

export const useUpdateFilterProducts = (filteredProducts: Ref<InProduct[]>, currentPage: Ref<number>) => {
  const updateFilteredProducts = (filtered: InProduct[]) => {
    filteredProducts.value = filtered;
    currentPage.value = 1;
  }

  return {
    updateFilteredProducts
  }
}
