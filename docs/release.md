# Release

This package uses npm trusted publishing for GitHub Actions so release builds do
not need a long-lived npm token in repository secrets.

## Trusted Publisher Setup

Configure npm once for the existing package:

- Package: `codex-agent-session-manager`
- Provider: GitHub Actions
- GitHub organization/user: `Apethor`
- Repository: `codex-agent-session-manager`
- Workflow filename: `publish.yml`
- Environment name: leave empty
- Allowed action: `npm publish`

Equivalent npm CLI command:

```powershell
npx npm@latest trust github codex-agent-session-manager --repo Apethor/codex-agent-session-manager --file publish.yml --allow-publish
```

The trust command requires package write access and npm account 2FA. The local
npm bundled with Node may lag behind; use `npx npm@latest` or npm `11.10.0+`
for `npm trust`.

## Publish

After committing and pushing the version bump, run the manual GitHub workflow:

```powershell
gh workflow run publish.yml -f dist_tag=latest
```

Use `dist_tag=latest` when the npm package page should immediately show the new
README. Use `dist_tag=alpha` only when intentionally keeping `latest` on an
older release.

npm trusted publishing currently authenticates `npm publish` and
`npm stage publish`, but not `npm dist-tag add`. The publish workflow therefore
sets exactly one dist-tag at publish time. If both `latest` and `alpha` should
point to the same version, publish with the tag that matters most, then run the
other tag change interactively with npm 2FA:

```powershell
npm dist-tag add codex-agent-session-manager@<version> alpha
```

## Local Checks

Before triggering the publish workflow, run:

```powershell
npm run check
npm test
npm run smoke
npm run security:smoke
npm run security:scan
npm run audit:prod
npm run pack:validate
```
