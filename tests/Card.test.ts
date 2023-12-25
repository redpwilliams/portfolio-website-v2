import { test, expect } from 'vitest'

const add = (a: number, b: number) => {
  return a + b
}

test('should add', () => {
  expect(add(1, 2)).toBe(3)
})

test('should run after changing lint-staged', () => {
  expect(add(2, -1)).toBe(1)
})
