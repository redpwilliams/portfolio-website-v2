import { test, expect } from 'vitest'

const add = (a: number, b: number) => {
  return a + b
}

test('should add', () => {
  expect(add(1, 2)).toBe(3)
})
