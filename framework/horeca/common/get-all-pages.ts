import type { RecursivePartial, RecursiveRequired } from '../api/utils/types'
import { BigcommerceConfig, getConfig } from '../api'
import { definitions } from '../api/definitions/store-content'

export type Page = definitions['page_Full']

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
> = T

async function getAllPages({
  config,
  preview,
}: {
  url?: string
  config?: BigcommerceConfig
  preview?: boolean
} = {}): Promise<GetAllPagesResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `url`
  // const { data } = await config.storeApiFetch<
  //   RecursivePartial<{ data: Page[] }>
  // >('/api/pages')
  // const pages = (data as RecursiveRequired<typeof data>) ?? []

  return {
    pages: [],
  }
}

export default getAllPages
