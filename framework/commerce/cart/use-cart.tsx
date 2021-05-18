import { useHook, useSWRHook } from '../utils/use-hook'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { Cart } from '../types'
import { Provider, useCommerce } from '..'

export type FetchCartInput = {
  cartId?: Cart['id']
}

export type UseCart<
  H extends SWRHook<any, any, any> = SWRHook<
    Cart | null,
    {},
    FetchCartInput,
    { isEmpty?: boolean }
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  return cartId ? await fetch({ ...options }) : null
}

const fn = (provider: Provider) => provider.cart?.useCart!

const useCart: UseCart = (input) => {
  const hook = useHook(fn)
  const { cartCookie } = useCommerce()
  const fetcherFn = hook.fetcher ?? fetcher
  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = localStorage.getItem('bc_cartId') + ''
    return fetcherFn(context)
  }
  return useSWRHook({ ...hook, fetcher: wrapper })(input)
}

export default useCart
