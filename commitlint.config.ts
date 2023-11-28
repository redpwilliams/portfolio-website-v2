import type { UserConfig } from '@commitlint/types'
import { CommitFields } from './options/commits.fields'
import { CommitRules } from './options/commits.rules'

// Commitlint config
const Config: UserConfig = {
  // Resolve and load @commitlint/config-conventional from node_modules
  extends: ['@commitlint/config-conventional'],

  // Resolve and load conventional-changelog-atom from node_modules
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)\(([^)]*)\): (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },

  // Resolve and load @commitlint/format from node_modules
  formatter: '@commitlint/format',

  rules: CommitRules,

  // Functions that return true if commitlint should ingore the given message
  ignores: [(commit) => commit === ''],

  // Whether commitlint uses the default ingore rules
  defaultIgnores: true,

  // Custom URL to show upon failure
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',

  // Custom prompt configuration
  prompt: {
    messages: {
      emptyWarning: 'The commit cannot be empty.'
    },
    questions: {
      type: {
        description: 'Select the type of change to commit:',
        enum: CommitFields
      },
      scope: {
        description: 'The scope, component, or filename affected.'
      },
      subject: {
        description: 'A short description of the changes.'
      }
    }
  }
}

module.exports = Config
