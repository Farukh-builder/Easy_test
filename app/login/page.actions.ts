'use server'

interface AuthState {
  isAuthenticated: boolean
}

interface CreateAccountData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

interface CreateAccountResult {
  success: boolean
  message?: string
}

// Simulated authentication state
let currentUser: { email: string } | null = null

export async function getInitialAuthState(): Promise<AuthState> {
  return {
    isAuthenticated: currentUser !== null,
  }
}

export async function createAccount(data: CreateAccountData): Promise<CreateAccountResult> {
  // Simulate server-side account creation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo validation (in production, this would save to database)
  if (data.email && data.password.length >= 6 && data.firstName && data.lastName) {
    currentUser = { email: data.email }
    return {
      success: true,
      message: 'Account created successfully',
    }
  }

  return {
    success: false,
    message: 'Please fill in all required fields',
  }
}

