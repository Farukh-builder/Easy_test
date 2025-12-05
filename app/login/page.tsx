import { getInitialAuthState } from './page.actions'
import SignupPageClient from './page.client'

export default async function SignupPage() {
  const initialAuthState = await getInitialAuthState()

  return <SignupPageClient initialAuthState={initialAuthState} />
}

