// TODO REMOVE!
import type { ProductsHandlers } from '../products'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

// Return current cart info
const getProducts: ProductsHandlers['getProducts'] = async ({
  res,
  body: { search, category, brand, sort },
  config,
}) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL('/v3/catalog/products', 'http://a')

  url.searchParams.set('is_visible', 'true')
  url.searchParams.set('limit', String(LIMIT))

  if (search) url.searchParams.set('keyword', search)

  if (category && Number.isInteger(Number(category)))
    url.searchParams.set('categories:in', category)

  if (brand && Number.isInteger(Number(brand)))
    url.searchParams.set('brand_id', brand)

  if (sort) {
    const [_sort, direction] = sort.split('-')
    const sortValue = SORT[_sort]

    if (sortValue && direction) {
      url.searchParams.set('sort', sortValue)
      url.searchParams.set('direction', direction)
    }
  }

  // We only want the id of each product
  url.searchParams.set('include_fields', 'id')

  const { data } = await config.storeApiFetch<{ data: { id: number }[] }>(
    url.pathname + url.search
  )

  const entityIds = data.map((p) => p.id)
  const found = entityIds.length > 0

  res.status(200).json({ data: { products: [], found } })
}

export default getProducts
