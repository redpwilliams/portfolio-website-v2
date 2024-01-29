import Project, { type ProjectType } from './project'
import Report, { type ReportType } from './report'

// Export schema objects
export const schemaTypes = [Project, Report]

// Export respective schema types
export type { ProjectType, ReportType }
