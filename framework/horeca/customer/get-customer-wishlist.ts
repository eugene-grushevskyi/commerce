import { BigcommerceConfig, getConfig } from '../api'
import type { RecursivePartial } from '../api/utils/types'

export type Wishlist = any
export type WishlistItem = any
export type GetCustomerWishlistResult<
  T extends { wishlist?: any } = { wishlist?: any }
> = T

export type GetCustomerWishlistVariables = {
  customerId: number
}

async function getCustomerWishlist({
  config,
  variables,
  includeProducts,
}: {
  url?: string
  variables: GetCustomerWishlistVariables
  config?: BigcommerceConfig
  includeProducts?: boolean
}): Promise<GetCustomerWishlistResult> {
  config = getConfig(config)

  const { data = [] } = await config.storeApiFetch<
    RecursivePartial<{ data: any }>
  >(`/api/wishlists?customer_id=${variables.customerId}`)
  return { wishlist: undefined }
}

export default getCustomerWishlist
