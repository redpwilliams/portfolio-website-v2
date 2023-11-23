import "dotenv/config"
import { defineConfig } from "astro/config"
import { sanityIntegration as sanity } from "@sanity/astro"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: "production",
      apiVersion: "2021-03-25",
      useCdn: true,
      studioBasePath: "/studio"
    }),
    react()
  ],
  server: { port: 3000, host: false }
})
