import { defineConfig } from "astro/config"
import { sanityIntegration as sanity } from "@sanity/astro"
import react from "@astrojs/react"

if (process.env.NODE_ENV !== "production") {
  import("dotenv/config")
}

console.log(`Project Mode: ${process.env.NODE_ENV}`)

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
  ],
  server: { port: 3000, host: true }
})
