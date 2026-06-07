import { validateAppServerUrl } from '../security/url.js';
import { readWorkspaceAppServerStates } from './state.js';

function readWorkspaceStateUrl(workspace: string): string | null {
  for (const stateRead of readWorkspaceAppServerStates(workspace)) {
    const url = stateRead.state?.url;
    if (typeof url === 'string' && url.length > 0) return url;
  }

  return null;
}

export function resolveAppServerUrl(
  inputUrl: string | undefined,
  env: NodeJS.ProcessEnv = process.env,
  workspace = process.cwd(),
): string {
  if (inputUrl !== undefined) {
    return validateAppServerUrl(inputUrl, 'App Server URL from tool input').href;
  }

  const envUrl = env.CODEX_APP_SERVER_URL;
  if (envUrl !== undefined) {
    return validateAppServerUrl(envUrl, 'App Server URL from CODEX_APP_SERVER_URL').href;
  }

  const stateUrl = readWorkspaceStateUrl(workspace);
  if (stateUrl !== null) {
    return validateAppServerUrl(stateUrl, 'App Server URL from workspace launcher state').href;
  }

  throw new Error('No App Server URL is configured. Provide appServerUrl, set CODEX_APP_SERVER_URL, or start from workspace launcher state.');
}
