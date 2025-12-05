'use client'

import { useState } from 'react'
import { increment, decrement, reset } from './page.actions'
import styles from './page.module.scss'

export default function PageClient({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  const handleIncrement = async () => {
    const newCount = await increment()
    setCount(newCount)
  }

  const handleDecrement = async () => {
    const newCount = await decrement()
    setCount(newCount)
  }

  const handleReset = async () => {
    const newCount = await reset()
    setCount(newCount)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Counter POC</h1>
        <p className={styles.count}>{count}</p>
        <div className={styles.buttons}>
          <button className={styles.btnDecrement} onClick={handleDecrement}>
            -1
          </button>
          <button className={styles.btnReset} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.btnIncrement} onClick={handleIncrement}>
            +1
          </button>
        </div>
        <p className={styles.footer}>Server Actions Demo</p>
      </div>
    </div>
  )
}

