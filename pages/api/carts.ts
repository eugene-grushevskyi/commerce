import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  debugger
  try {
    if (req.method === 'POST') {
      const cart = await axios.post(
        process.env.STORE_API_URL + '/api/cart',
        {
          ...req.body,
        },
        {
          headers: req.headers,
        }
      )
    }
    if (req.method === 'GET') {
      const cart = await axios.get(process.env.STORE_API_URL + '/api/cart', {})
    }
  } catch (e) {
    console.error(e)
  }
  res.status(200).json({ name: 'John Doe' })
}
