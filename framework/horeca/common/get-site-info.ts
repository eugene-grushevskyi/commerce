import type { GetSiteInfoQuery, GetSiteInfoQueryVariables } from '../schema'
import { BigcommerceConfig, getConfig } from '../api'

export type CategoriesTree = NonNullable<
  GetSiteInfoQuery['site']['categoryTree']
>

export type BrandEdge = NonNullable<
  NonNullable<GetSiteInfoQuery['site']['brands']['edges']>[0]
>

export type Brands = BrandEdge[]

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: CategoriesTree
    brands: Brands
  }
> = T

async function getSiteInfo({
  query,
  variables,
  config,
}: {
  query?: string
  variables?: GetSiteInfoQueryVariables
  config?: BigcommerceConfig
  preview?: boolean
} = {}): Promise<GetSiteInfoResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  // const { data } = await config.fetch<RecursivePartial<GetSiteInfoQuery>>(
  //   query,
  //   { variables }
  // )

  return {
    categories: [],
    brands: [],
  }
}

export default getSiteInfo
