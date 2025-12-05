import { getCount } from './page.actions'
import PageClient from './page.client'

export default async function Page() {
  const initialCount = await getCount()

  return <PageClient initialCount={initialCount} />
}

