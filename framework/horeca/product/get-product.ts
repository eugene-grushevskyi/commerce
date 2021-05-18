import { Product, ProductAdapter } from '@commerce/types'
import { BigcommerceConfig, getConfig } from '../api'

async function getProduct({
  variables: { slug, ...vars },
  config,
}: {
  variables: any
  config?: BigcommerceConfig
}): Promise<Product | {} | any> {
  config = getConfig(config)

  const { data } = await config.storeApiFetch<{ data: Product[] }>(
    '/api/product/' + slug,
    {
      method: 'GET',
    }
  )
  if (data) {
    return { product: ProductAdapter.transform(data) }
  } else {
    return {}
  }
}

export default getProduct
