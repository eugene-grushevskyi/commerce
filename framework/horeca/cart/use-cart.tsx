import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart, FetchCartInput } from '@commerce/cart/use-cart'
import type { Cart } from '../types'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/cart',
    method: 'GET',
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      options.url +=
        '?' +
        new URLSearchParams({
          cartId,
        })
    }
    return fetch<Cart>(options)
  },
  useHook: ({ useData }) => (input) => {
    const response = useData({
      swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
    })

    return useMemo(
      () =>
        Object.create(response, {
          isEmpty: {
            get() {
              return (response.data?.lineItems.length ?? 0) <= 0
            },
            enumerable: true,
          },
        }),
      [response]
    )
  },
}
