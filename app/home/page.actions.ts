'use server'

let count = 0

export async function increment() {
  count += 1
  return count
}

export async function decrement() {
  count -= 1
  return count
}

export async function reset() {
  count = 0
  return count
}

export async function getCount() {
  return count
}

