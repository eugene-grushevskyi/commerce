import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import CartItem from '../CartItem'
import s from './CartSidebarView.module.css'
import { Button } from '@components/ui'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'

const PACKAGE_PRICE = 5

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI()
  const { data, isLoading, isEmpty } = useCart({})
  // const [delivery, setDelivery] = useState(false)
  const [packagingPrice, setPackagingPrice] = useState(0)

  useEffect(() => {
    let price = 0
    data?.lineItems.forEach((v) => {
      price += PACKAGE_PRICE * v.quantity
    })
    setPackagingPrice(price)
  }, [data])

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()

  const error = null
  const success = null

  return (
    <div
      className={cn(s.root, {
        [s.empty]: error || success || isLoading || isEmpty,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>

      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Ваша корзина пуста
          </h2>
          <p className="text-accents-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Дякуємо за замовлення
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <h2
                className="pt-1 pb-4 text-2xl leading-7 font-bold text-base tracking-wide cursor-pointer inline-block"
                onClick={handleClose}
              >
                Замовлення
              </h2>
            </Link>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={'t' + item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-4  py-5 sm:px-6">
            <div className="border-t border-accents-3">
              <ul className="py-3">
                <li className="flex justify-between py-1">
                  <span>Вартість у закладі</span>
                  <span>{subTotal}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Упаковка у закладі</span>
                  <span>UAH {packagingPrice}.00</span>
                </li>
                {/* <li className="flex justify-between py-1">
                  <span>Доставка</span>
                  <span className="font-bold tracking-wide">
                    {delivery ? '33 UAH' : 'FREE'}
                  </span>
                </li> */}
              </ul>
              <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                <span>Всього</span>
                <span>{total}</span>
              </div>
            </div>
            <Button href="/checkout" Component="a" width="100%">
              Оформити замовлення
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
