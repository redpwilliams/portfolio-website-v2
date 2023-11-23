import { defineConfig } from "astro/config"
import { sanityIntegration as sanity } from "@sanity/astro"
import react from "@astrojs/react"

if (process.env.mode !== "production") {
  import("dotenv/config")
}

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: "production",
      apiVersion: "2023-11-23",
      useCdn: false,
      studioBasePath: "/studio"
    }),
    react()
  ]
})
