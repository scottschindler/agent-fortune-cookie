import { getFortunes } from '@/lib/fortunes'

export const dynamic = 'force-dynamic'

export async function GET() {
  const fortunes = getFortunes()
  return Response.json({ fortunes, total: fortunes.length })
}
