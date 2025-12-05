import { getInitialAuthState } from './page.actions'
import LoginPageClient from './page.client'

export default async function LoginPage() {
  const initialAuthState = await getInitialAuthState()

  return <LoginPageClient initialAuthState={initialAuthState} />
}

