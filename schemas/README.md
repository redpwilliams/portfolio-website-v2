# Schemas

This project uses Sanity.io to supply its content. This content is structured and follows a predefined schema. Each schema file is responsible for three things:

1. Importing types from Sanity to type/structure the schema definition itself.
2. Exporting the schema itself (to `index.ts`).
3. Exporting an interface that reflects the properties of the schema for type checking later on.
