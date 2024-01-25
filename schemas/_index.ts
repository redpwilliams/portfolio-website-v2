import Project, { type TProject } from './project'
import Report, { type TReport } from './report'

// Export schema objects
export const schemaTypes = [Project, Report]

// Export respective schema types
export type { TProject, TReport }
