# Portfolio Website v2

This is the second iteration of my website, made with Astro with a React integration. It uses Sanity.io as a CMS.

To run the project locally:

```sh
npm install
npm run prepare
```

The prepare script installs husky enabling commit/merge linting via git hooks and lint-staged.

## Project Structure

```text
┌── public/
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── img/
│
└── package.json
```

`public/`: Currently, contains smaller content like images.

`components/`: Resuable components.

`layouts/`: Components that encapsulate other html.

`img/`: Images, pretty self-explanatory. Note, [per Astro's docs]('https://docs.astro.build/en/guides/images/#where-to-store-images'), _most_ images are placed here in `src`, instead of `public`.

> **Note:** Each folder in `src/` has an `index.astro` file. For cleaner imports, each component should export into that file in their respective folders. Then, components can be imported with named imports from the index file.
>
> Additionally, both Vite and Typscript are set up so that the import alias `@components` is valid. Similarly for layouts, pages, and img folders.

## NPM Scripts

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run prepare` | Prepares husky git hooks                     |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Sanity Integration

A `projectID` is needed for the sanity integration. `SANITY_PROJECT_ID="[projectId]"` should be loaded in a `.env` file, ignored by `.gitignore`. See [`astro.config.mjs`](./astro.config.mjs#14)

## Commitlint

Commit linting is configured with the [Commitlint](https://commitlint.js.org/#/) module. This helps to maintain a clean commit history for later viewing.
I've separated the [types of commits](./commits/commits.fields.ts) and their [formatting rules](./commits/commits.rules.ts) in the `commits` folder, and will reiterate the fields here:

| Field      | Description                                                                    |
| :--------- | :----------------------------------------------------------------------------- |
| `feat`     | New behaviors or major milestones                                              |
| `refactor` | Changes to codebase to improve structure, organization, and/or readability     |
| `fix`      | Fixes to bugs or bad behaviors                                                 |
| `style`    | Changes to the styling of components                                           |
| `chore`    | Tasks that don't modify src, like updating dependencies, adding assets, etc.   |
| `working`  | Intermediate commits that represent a working idea, or one that is in progress |
| `perf`     | Optimizations and improvements (e.g. page load time, images, etc. )            |
| `docs`     | Changes to README files or other documentation                                 |
| `test`     | Addition/modifications to test cases                                           |

Along with husky, this works with [lint-staged](https://github.com/lint-staged/lint-staged) to run `eslint` and `prettier` only on staged files at commit.
