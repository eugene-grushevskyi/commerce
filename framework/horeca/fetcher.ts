import { FetcherError } from '@commerce/utils/errors'
import type { Fetcher } from '@commerce/utils/types'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

const fetcher: Fetcher = async ({
  url,
  method = 'GET',
  variables,
  body: bodyObj,
}) => {
  const config = {
    storeApiToken: 'test',
    storeApiClientId: process.env.NEXT_PUBLIC_STORE_API_CLIENT_ID + '',
    storeApiUrl: process.env.NEXT_PUBLIC_STORE_API_URL + '',
  }
  const hasBody = Boolean(variables || bodyObj)
  const body = hasBody
    ? JSON.stringify(variables ? { variables } : bodyObj)
    : undefined
  const hdrs = hasBody ? { 'Content-Type': 'application/json' } : undefined
  const headers = {
    ...hdrs,
    'X-Auth-Token': config.storeApiToken,
    'X-Auth-Client': config.storeApiClientId,
  }
  const res = await fetch((config.storeApiUrl + url)!, {
    method,
    body,
    headers,
    credentials: 'include',
  })

  if (res.ok) {
    const { data } = await res.json()
    return data
  }

  throw await getError(res)
}

export default fetcher
