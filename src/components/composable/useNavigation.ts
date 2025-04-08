import { useRouter } from "vue-router"
export const useNavigation = () => {
  const router = useRouter()
  const goToCategoryProduct = (categoryId: string) => {
    router.push(`/category/${categoryId}`)
  }

  const goToProduct = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  return {
    goToCategoryProduct,
    goToProduct
  }
}
