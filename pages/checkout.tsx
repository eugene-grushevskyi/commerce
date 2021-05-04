import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import { Layout } from '@components/common'
import { Button, Input, Text } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { CartItem } from '@components/cart'
import { useCallback, useState } from 'react'

export default function Checkout() {
  const error = null
  const [success, setSuccess] = useState<boolean>(false)
  const [deliver, setDeliver] = useState<boolean>(false)
  const { data, isLoading, isEmpty } = useCart()

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

  const checkout = useCallback(() => {
    console.log(data)
    setSuccess(true)
  }, [success])

  return (
    <div className="grid lg:grid-cols-12 w-full max-w-7xl mx-auto">
      <div className="lg:col-span-8">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Упс... здається, тут пусто.
            </h2>
            <p className="text-accents-6 px-10 text-center pt-2">
              Устрички, ігристе, роли, все чого душа бажає...
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Дякуємо за ваше замовлення.
            </h2>
          </div>
        ) : (
          <div className="px-4 sm:px-6 flex-1">
            <Text variant="pageHeading">Замовлення</Text>
            <Text variant="sectionHeading">
              Перегляньте правильність вашого замовлення
            </Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
              {data!.lineItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
            <div className="my-6">
              <Text>Рекомендуємо додати до замовлення</Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="border border-accents-3 w-full h-24 bg-accents-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          <div className="px-6 py-6 mb-4">
            <Text>Ім'я</Text>
            <Input></Input>
            <Text>Телефон</Text>
            <Input></Input>
            <Text>Адреса/Примітка</Text>
            <Input></Input>
          </div>

          {/* Shipping Address */}
          {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
          <div
            className={
              deliver
                ? 'active-delivery'
                : '' +
                  ' rounded-md border border-accents-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4'
            }
            onClick={() => {
              setDeliver(true)
            }}
          >
            <div className="mr-5">
              <MapPin />
            </div>
            <div className="text-sm text-center font-medium">
              <span className="uppercase">Вказати адресу</span>
            </div>
          </div>
          <div
            className={
              !deliver
                ? 'active-delivery'
                : '' +
                  ' rounded-md border border-accents-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4'
            }
            onClick={() => {
              setDeliver(false)
            }}
          >
            <div className="mr-5">
              <MapPin />
            </div>
            <div className="text-sm text-center font-medium">
              <span className="uppercase">Драйвую пішки</span>
            </div>
          </div>
          {/* Payment Method */}
          {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
          <div className="rounded-md border border-accents-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4">
            <div className="mr-5">
              <CreditCard />
            </div>
            <div className="text-sm text-center font-medium">
              <span className="uppercase">Оплата картою</span>
              {/* <span>VISA #### #### #### 2345</span> */}
            </div>
          </div>
          {/* </>
          )} */}
          <div className="border-t border-accents-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Сума</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Пакування у закладі</span>
                <span>UAH 5</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Вартість доставки</span>
                <span className="font-bold tracking-wide">UAH 33</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
              <span>Всього</span>
              <span>{total}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Хочу ще чогось
                </Button>
              ) : (
                <Button onClick={checkout} Component="a" width="100%">
                  Замовити
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Checkout.Layout = Layout
