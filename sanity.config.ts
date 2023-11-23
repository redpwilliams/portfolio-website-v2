import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "../sanity/schemas"

export default defineConfig({
  name: "default",
  title: "sanity",
  basePath: "/studio",

  projectId: "5h390hik",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {}
})
