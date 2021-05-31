import { Layout } from '@components/common'
import { Grid, Marquee, Hero, Button } from '@components/ui'
import { ProductCard } from '@components/product'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import Link from 'next/dist/client/link'
import s from '@components/common/Navbar/Navbar.module.css'
import React from 'react'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const pages = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="mb-4 flex flex-column align-items-center lg:hidden">
        <Link href="/search">
          <Button aria-label="До Меню" className={s.button}>
            До Меню
          </Button>
        </Link>
      </div>
      <Grid>
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Hero
        headline="Улюблені страви від Mushlya – у вас вдома"
        description="
        <ul>
          <li>1. Доставка в будь-яку точку міста</li>
          <li>2. Вартість доставки - 33 гривні</li>
          <li>3. Замовляйте щодня з 11.00 до 21.00</li>
        </ul>
        "
      />
      <Grid layout="B">
        {products.slice(12, 15).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(8, 11).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 420,
              height: 320,
            }}
          />
        ))}
      </Marquee>
    </>
  )
}

Home.Layout = Layout
