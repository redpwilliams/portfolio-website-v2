import type { RulesConfig } from '@commitlint/types'
import { CommitFields } from './commits.fields'

export const CommitRules: Partial<RulesConfig> = {
  'body-full-stop': [0, 'always', ''],
  'body-leading-blank': [0, 'always'],
  'body-empty': [0, 'always'],
  'body-case': [0, 'always', 'sentencecase'],
  'body-max-line-length': [0, 'always', Infinity],
  'type-enum': [2, 'always', Object.keys(CommitFields)],
  'type-case': [1, 'always', 'lower-case'],
  'scope-case': [2, 'always', 'lowerCase']
} as const
