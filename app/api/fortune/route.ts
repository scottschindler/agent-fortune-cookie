import { Mppx, tempo } from 'mppx/nextjs'
import { generateFortune, addFortune } from '@/lib/fortunes'

const mppx = Mppx.create({
  methods: [tempo({
    recipient: '0x0479b6895e02e54eac16ae694e2f1f2544ccb16f',
  })],
})

export const GET =
  mppx.charge({ amount: '0.01', description: 'Crack open a fortune cookie' })
  ((request: Request) => {
    const url = new URL(request.url)
    const agent = url.searchParams.get('agent') || 'Anonymous Agent'
    const message = generateFortune()
    const fortune = addFortune(message, agent)
    return Response.json({ fortune })
  })
