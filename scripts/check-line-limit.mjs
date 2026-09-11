#!/usr/bin/env node
// Line-guard: enforces the 200-line limit on all non-binary files visible to git
// (tracked + untracked non-ignored), complementing ESLint `max-lines` which does
// not cover non-code files (.md, .json, .svg, ...).
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const MAX_LINES = 200
// Generated lockfiles are the only files excluded from the universe.
const EXCLUDED_PATHS = ['package-lock.json']
// Binary extensions are outside the counting domain: wc -l semantics is
// meaningless for binary content.
const BINARY_EXTENSIONS = ['.png', '.ico', '.webp']

let universe
try {
  universe = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard'],
    { encoding: 'utf8' },
  )
}
catch (error) {
  console.error(`line-guard: failed to query git universe: ${error.message}`)
  process.exit(1)
}

const paths = universe.split('\n').filter(Boolean)

if (paths.length === 0) {
  console.error(
    'line-guard: git universe is empty (no tracked or untracked files found).'
    + ' Refusing to pass silently — run from the repository root.',
  )
  process.exit(1)
}

const violations = []
let checked = 0

for (const path of paths) {
  if (EXCLUDED_PATHS.includes(path) || BINARY_EXTENSIONS.some(ext => path.endsWith(ext)))
    continue
  // Paths deleted from disk but still in the index are skipped.
  if (!existsSync(path))
    continue
  // wc -l semantics: count newline characters.
  const lines = readFileSync(path, 'utf8').split('\n').length - 1
  checked++
  if (lines > MAX_LINES)
    violations.push(`${path}: ${lines} lines (limit ${MAX_LINES})`)
}

if (violations.length > 0) {
  console.error(`line-guard: ${violations.length} file(s) exceed the ${MAX_LINES}-line limit:`)
  for (const violation of violations)
    console.error(`  - ${violation}`)
  process.exit(1)
}

console.log(`line-guard: ok — ${checked} file(s) checked, all <= ${MAX_LINES} lines`)
