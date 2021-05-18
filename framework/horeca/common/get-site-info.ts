import type { CategoryTreeItem, GetSiteInfoQueryVariables } from '../schema'
import { BigcommerceConfig, getConfig } from '../api'

async function getSiteInfo({
  query,
  variables,
  config,
}: {
  query?: string
  variables?: GetSiteInfoQueryVariables
  config?: BigcommerceConfig
  preview?: boolean
} = {}): Promise<{ categories: CategoryTreeItem[]; brands: any[] }> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.storeApiFetch('/api/category', {
    method: 'GET',
  })
  return {
    categories: data.map((v: CategoryTreeItem | any, index: number) => ({
      ...v,
      path: v['_id'] as string, // v.name.replace(' ', '_').toLowerCase(),
      entityId: index,
    })),
    brands: [],
  }
}

export default getSiteInfo
