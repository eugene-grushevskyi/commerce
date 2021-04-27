import type { Product } from '@commerce/types'
import type { Cart, BigcommerceCart, LineItem } from '../types'
import update from './immutability'

function normalizeProductOption(productOption: any) {
  const {
    node: {
      entityId,
      values: { edges },
      ...rest
    },
  } = productOption

  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: any): Product {
  const {
    entityId: id,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
  } = productNode

  return update(productNode, {
    id: { $set: String(id) },
    images: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { urlOriginal, altText, ...rest } }: any) => ({
          url: urlOriginal,
          alt: altText,
          ...rest,
        })),
    },
    variants: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { entityId, productOptions, ...rest } }: any) => ({
          id: entityId,
          options: productOptions?.edges
            ? productOptions.edges.map(normalizeProductOption)
            : [],
          ...rest,
        })),
    },
    options: {
      $set: productOptions.edges
        ? productOptions?.edges.map(normalizeProductOption)
        : [],
    },
    brand: {
      $apply: (brand: any) => (brand?.entityId ? brand?.entityId : null),
    },
    slug: {
      $set: path?.replace(/^\/+|\/+$/g, ''),
    },
    price: {
      $set: {
        value: prices?.price.value,
        currencyCode: prices?.price.currencyCode,
      },
    },
    $unset: ['entityId'],
  })
}

export function normalizeCart(data: BigcommerceCart): Cart {
  return {
    id: data.id,
    customerId: String(data.customer_id),
    email: data.email,
    createdAt: data.created_time,
    currency: data.currency,
    taxesIncluded: data.tax_included,
    lineItems: data.line_items.physical_items.map(normalizeLineItem),
    lineItemsSubtotalPrice: data.base_amount,
    subtotalPrice: data.base_amount + data.discount_amount,
    totalPrice: data.cart_amount,
    discounts: data.discounts?.map((discount) => ({
      value: discount.discounted_amount,
    })),
  }
}

export function normalizeHorecaCart(data: any): Cart {
  return {
    id: data._id,
    email: data.email,
    createdAt: data.createdAt,
    currency: data.currency,
    taxesIncluded: data.taxesIncluded,
    lineItems: data.lineItems.map(normalizeHorecaLineItem),
    lineItemsSubtotalPrice: data.lineItemsSubtotalPrice,
    subtotalPrice: data.subtotalPrice,
    totalPrice: data.totalPrice,
    discounts: [],
  }
}

function normalizeHorecaLineItem(item: any): LineItem {
  return {
    id: item.id,
    variantId: String(item.id),
    productId: String(item._id),
    name: item.name,
    quantity: item.quantity || 1,
    variant: {
      id: String(item._id),
      sku: item.sku,
      name: item.name,
      image: {
        url: item.images[0].url,
      },
      requiresShipping: false,
      price: item.price,
      listPrice: item.price,
    },
    path: item.path,
    discounts: [],
  }
}

function normalizeLineItem(item: any): LineItem {
  return {
    id: item.id,
    variantId: String(item.variant_id),
    productId: String(item.product_id),
    name: item.name,
    quantity: item.quantity,
    variant: {
      id: String(item.variant_id),
      sku: item.sku,
      name: item.name,
      image: {
        url: item.image_url,
      },
      requiresShipping: item.is_require_shipping,
      price: item.sale_price,
      listPrice: item.list_price,
    },
    path: item.url.split('/')[3],
    discounts: item.discounts.map((discount: any) => ({
      value: discount.discounted_amount,
    })),
  }
}
