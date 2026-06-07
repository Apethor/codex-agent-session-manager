import { existsSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';

function pathInside(candidate: string, root: string): boolean {
  const relation = relative(root, candidate);
  return relation === '' || (!relation.startsWith('..') && !isAbsolute(relation));
}

function deepestExistingAncestor(path: string): string {
  let current = path;
  while (!existsSync(current)) {
    const parent = dirname(current);
    if (parent === current) return current;
    current = parent;
  }
  return current;
}

export function resolveWorkspaceCwd(inputCwd: string | undefined, workspaceRoot = process.cwd()): string {
  const root = resolve(workspaceRoot);
  const rootReal = realpathSync.native(root);
  const candidate = inputCwd === undefined ? root : resolve(root, inputCwd);

  if (!pathInside(candidate, root)) {
    throw new Error('Workspace cwd must stay inside the current workspace.');
  }

  const existingAncestor = deepestExistingAncestor(candidate);
  const ancestorReal = realpathSync.native(existingAncestor);
  if (!pathInside(ancestorReal, rootReal)) {
    throw new Error('Workspace cwd must not escape the current workspace through a symlink or junction.');
  }

  return candidate;
}
