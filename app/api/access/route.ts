import { Mppx, tempo } from 'mppx/nextjs'

const mppx = Mppx.create({
  methods: [tempo({
    recipient: '0x0479b6895e02e54eac16ae694e2f1f2544ccb16f',
  })],
})

export const GET =
  mppx.charge({ amount: '0.01', description: 'One-time access fee' })
  (() => Response.json({ access: true }))
