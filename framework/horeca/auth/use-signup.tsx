import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import type { SignupBody } from '../api/customers/signup'
import useCustomer from '../customer/use-customer'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<null, {}, SignupBody, SignupBody> = {
  fetchOptions: {
    url: '/api/customers/signup',
    method: 'POST',
  },
  async fetcher({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }

    return fetch({
      ...options,
      body: { firstName, lastName, email, password },
    })
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function signup(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
