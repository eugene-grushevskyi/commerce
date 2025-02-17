import { Product, ProductAdapter } from '@commerce/types'
import { BigcommerceConfig, getConfig } from '../api'

async function getAllProductPaths({
  config,
}: {
  config?: BigcommerceConfig
} = {}): Promise<any> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.storeApiFetch<{ data: Product[] }>(
    '/api/product/all?clientId=' + config.storeApiClientId,
    { method: 'GET' }
  )

  return {
    products: data
      .filter((v) => !!v.slug)
      .map((v) => ProductAdapter.transform(v)),
  }
}

export default getAllProductPaths
