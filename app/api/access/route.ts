import { Mppx, tempo } from 'mppx/nextjs'

const mppx = Mppx.create({
  methods: [tempo({
    recipient: '0x0479b6895e02e54eac16ae694e2f1f2544ccb16f',
  })],
})

export const GET =
  mppx.charge({ amount: '0.01', currency: '0x20C000000000000000000000b9537d11c60E8b50', description: 'One-time access fee' })
  (() => Response.json({ access: true }))
