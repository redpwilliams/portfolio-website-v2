import type { RulesConfig } from '@commitlint/types'
import { CommitFields } from './commits.fields'

export const CommitRules: Partial<RulesConfig> = {
  'header-max-length': [2, 'always', 50],
  'type-enum': [2, 'always', Object.keys(CommitFields)],
  'type-case': [1, 'always', 'lower-case'],
  'scope-case': [2, 'always', 'kebab-case' || 'lowerCase'],
  'scope-empty': [2, 'never']
} as const
