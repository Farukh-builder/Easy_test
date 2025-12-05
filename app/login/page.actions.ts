'use server'

interface AuthState {
  isAuthenticated: boolean
}

interface LoginResult {
  success: boolean
  message?: string
}

// Simulated authentication state
let currentUser: { email: string } | null = null

export async function getInitialAuthState(): Promise<AuthState> {
  // Simulate checking authentication state
  return {
    isAuthenticated: currentUser !== null,
  }
}

export async function login(email: string, password: string): Promise<LoginResult> {
  // Simulate server-side authentication
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo credentials (in production, this would check against a database)
  if (email && password.length >= 6) {
    currentUser = { email }
    return {
      success: true,
      message: 'Login successful',
    }
  }

  return {
    success: false,
    message: 'Invalid email or password',
  }
}

export async function logout(): Promise<void> {
  currentUser = null
}

export async function checkAuth(): Promise<AuthState> {
  return {
    isAuthenticated: currentUser !== null,
  }
}

