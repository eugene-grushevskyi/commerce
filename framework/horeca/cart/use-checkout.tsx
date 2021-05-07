import fetcher from '@framework/fetcher'

export default function useCheckout() {
  return async (body: any) => {
    return fetcher({
      url: '/api/order',
      method: 'POST',
      variables: null,
      body: {
        ...body,
        clientId: process.env.NEXT_PUBLIC_STORE_API_CLIENT_ID,
      },
    })
  }
}
