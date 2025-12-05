'use client'

import { useState, useEffect } from 'react'
import { login, checkAuth } from './page.actions'
import styles from './page.module.scss'

interface LoginPageClientProps {
  initialAuthState: { isAuthenticated: boolean }
}

export default function LoginPageClient({ initialAuthState }: LoginPageClientProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState.isAuthenticated)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        setIsAuthenticated(true)
      } else {
        setError(result.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
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
          <button className={styles.sidebarToggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
            <span className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          {!isSidebarCollapsed && <h2 className={styles.sidebarTitle}>Navigation</h2>}
        </div>
        <nav className={styles.sidebarNav}>
          <a href="/" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>🏠</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Home</span>}
          </a>
          <a href="/dashboard" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>📊</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Dashboard</span>}
          </a>
          <a href="/projects" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>📁</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Projects</span>}
          </a>
          <a href="/settings" className={styles.navItem} onClick={closeMobileMenu}>
            <span className={styles.navIcon}>⚙️</span>
            {!isSidebarCollapsed && <span className={styles.navText}>Settings</span>}
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

        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Sign in to your account</p>

          {isAuthenticated ? (
            <div className={styles.loggedIn}>
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✓</span>
                <p>You are logged in successfully!</p>
              </div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <form className={styles.loginForm} onSubmit={handleLogin}>
              {error && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  <p>{error}</p>
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

