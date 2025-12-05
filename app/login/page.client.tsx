'use client'

import { useState, useEffect } from 'react'
import { createAccount } from './page.actions'
import styles from './page.module.scss'

interface SignupPageClientProps {
  initialAuthState: { isAuthenticated: boolean }
}

export default function SignupPageClient({ initialAuthState }: SignupPageClientProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await createAccount({
        firstName,
        lastName,
        email,
        phone,
        password,
      })
      if (result.success) {
        // Handle success
        alert('Account created successfully!')
      } else {
        setError(result.message || 'Account creation failed')
      }
    } catch (err) {
      setError('An error occurred during account creation')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    // Handle social sign-in
    console.log(`Sign in with ${provider}`)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`${styles.container} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu}></div>
      )}
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandIcon}></div>
          <button className={styles.sidebarToggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
            <span className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="#" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>💬</span>
            {!isSidebarCollapsed && <span className={styles.navText}>New Chat</span>}
          </a>
          <a href="#" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>📄</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Translate Text</span>}
          </a>
          <a href="#" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>🎥</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Translate Video</span>}
          </a>
          <a href="#" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>📁</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Files</span>}
          </a>
          <a href="#" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>🕐</span>
            {!isSidebarCollapsed && <span className={styles.navText}>History</span>}
          </a>
        </nav>
      </aside>

      <main className={styles.main}>
        <button
          className={styles.mobileMenuButton}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={styles.signupCard}>
          <h1 className={styles.signupTitle}>Create Aurorah Account</h1>

          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠</span>
              <p>{error}</p>
            </div>
          )}

          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="firstName"
                className={styles.input}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="lastName"
                className={styles.input}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.phoneInputWrapper}>
                <input
                  type="tel"
                  id="phone"
                  className={styles.input}
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <span className={styles.phoneDropdown}>▼</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={styles.createButton}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create an Account'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or sign in with</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.socialButton}
              onClick={() => handleSocialSignIn('google')}
            >
              <span className={styles.socialIcon}>G</span>
            </button>
            <button
              type="button"
              className={styles.socialButton}
              onClick={() => handleSocialSignIn('facebook')}
            >
              <span className={styles.socialIcon}>f</span>
            </button>
            <button
              type="button"
              className={styles.socialButton}
              onClick={() => handleSocialSignIn('apple')}
            >
              <span className={styles.socialIcon}>🍎</span>
            </button>
          </div>

          <p className={styles.signInLink}>
            Already have an account? <a href="/signin">Sign In</a>
          </p>

          <p className={styles.privacyNotice}>
            By creating an account, you agree to our user agreement and acknowledge our privacy notice.
          </p>
        </div>
      </main>
    </div>
  )
}

