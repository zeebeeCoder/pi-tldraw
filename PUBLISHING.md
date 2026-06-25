# Publishing `pi-tldraw`

This package is meant to be published as a Pi package on npm. Pi's gallery discovers npm packages with the `pi-package` keyword.

## Maintainer checklist

### 1. Create the GitHub repo

```bash
gh repo create <github-owner>/pi-tldraw --public --source=. --remote=origin --push
```

Or create an empty repo in GitHub's UI, then:

```bash
git remote add origin git@github.com:<github-owner>/pi-tldraw.git
git push -u origin main
```

After the repo exists, add repository metadata:

```bash
npm pkg set repository.type=git
npm pkg set repository.url=git+https://github.com/<github-owner>/pi-tldraw.git
npm pkg set bugs.url=https://github.com/<github-owner>/pi-tldraw/issues
npm pkg set homepage=https://github.com/<github-owner>/pi-tldraw#readme
```

### 2. Review package metadata

Before publishing, confirm these fields are final:

- `name`
- `version`
- `description`
- `license`
- `author`
- `contributors`
- `repository`
- `bugs`
- `homepage`
- `keywords` includes `pi-package`

### 3. Verify locally

```bash
npm ci
npm run check
npm pack --dry-run
pi -e .
```

Confirm `npm pack --dry-run` contains only package files, not `.pi/`, `node_modules/`, or local canvas snapshots.

### 4. Choose runtime MCP server strategy

`pi-tldraw` needs the tldraw MCP app/server reachable at `http://127.0.0.1:8787/mcp` by default.

For the first release, either:

- document that users run the tldraw MCP app separately and set `TLDRAW_MCP_AUTO_START=false`, or
- vendor/copy the tldraw `apps/mcp-app` directory into `./mcp-app` before publishing, so the extension can auto-start it.

If using an external checkout locally:

```bash
export TLDRAW_MCP_APP_DIR=/path/to/tldraw/apps/mcp-app
```

### 5. Publish to npm

`pi-tldraw` was available on npm when checked locally. Re-check before publishing:

```bash
npm view pi-tldraw name version
```

If it returns 404, publish:

```bash
npm login
npm publish
```

If you rename to a scoped package, publish public:

```bash
npm publish --access public
```

### 6. Optional: GitHub trusted publishing

The included `.github/workflows/publish.yml` can publish on GitHub Release. To use it without an npm token:

1. On npmjs.com, open the package settings.
2. Add a GitHub Actions trusted publisher for `<github-owner>/pi-tldraw` and workflow `.github/workflows/publish.yml`.
3. Create a GitHub Release for a semver tag like `v0.1.0`.

Alternatively, add an `NPM_TOKEN` repository secret and adjust the workflow to use `NODE_AUTH_TOKEN`.

## User install commands

```bash
pi install npm:pi-tldraw
```

Pinned:

```bash
pi install npm:pi-tldraw@0.1.0
```

Git install before npm publish:

```bash
pi install git:github.com/<github-owner>/pi-tldraw@v0.1.0
```
