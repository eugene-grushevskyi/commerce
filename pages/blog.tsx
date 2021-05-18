import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import { Layout } from '@components/common'
import { Container } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function Blog() {
  return (
    <div className="pb-20">
      <div className="text-center pt-5 pb-20 bg-violet">
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Вітаємо у МУШЛЯ
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            В кілька кліків тепер можна замовити свіжі устриці та мідії, кілька
            десятків страв зі свіжої риби та морепродуктів. Зверніть увагу на
            хіти продажів: устриці, мідії, стейк з тунця, сендвіч з лососем та
            пасту з морепродуктами. Смачного!
          </p>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <b>Популярне</b>: Авоська Mushlya Spritz, Авоська з рожевим вермутом
            Mushlya, Бейбі-каракатиці, Білоногі креветки, Боул з лососем та
            соусом теріякі, Боул з вугрем та соусом теріякі, Дикі аргентинські
            креветки, Гаряче плато XL, Холодне плато морепродуктів,
            Індивідуальний набір приборів: виделка, ложка, ніж, сухі серветки,
            волога серветка, рукавички, Казанок мідій у соусі дорблю, Казанок
            мідій у соусі дорблю для компанії, Казанок мідій у вершковому соусі,
            Казанок мідій у вершковому соусі для компанії, Лимонад (на розлив),
            Пів лобстера гриль, Морські гребінці, МУШЛЯ КОРПОРАТИВ СЕТ ЧОРНА
            ПЕРЛИНА, МУШЛЯ КОРПОРАТИВ СЕТ ФІН ДЕ КЛЕР, НОВОРІЧНА МУШЛЯ АВОСЬКА
            біла, НОВОРІЧНА МУШЛЯ АВОСЬКА рожева, НОВОРІЧНИЙ МУШЛЯ ХОТ СЕТ,
            НОВОРІЧНИЙ МУШЛЯ КОЛД СЕТ, OYSTERS PARTYHARD ❤️, Плато холодне XL з
            тартарами, Плато креветок XL на компанію, Рибне плато XL, Салат з
            тигровими креветками та манго, Сендвіч зі скумбрією гриль, Сендвіч
            зі стейком з тунця, Сидр Білий Налив на розлив, Стейк з лосося,
            Стейк з тунця, Бургер з котлетою і тигровою креветкою, Тигрові
            креветки темпура, Устриці Fine de Claire №3 (6 штук), Місо суп з
            мідіями та лосесем, Місо суп з вугрем, Місо суп з креветкою, Плато
            креветок + 1л пива MUSHLYA = 299₴, Білоногі креветки + 1л пива
            MUSHLYA = 259₴, Fanta, Sprite, Frizzante (біле ігристе вино на
            розлив)
          </p>
        </Container>
      </div>
    </div>
  )
}

Blog.Layout = Layout
