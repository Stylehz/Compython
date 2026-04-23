// Node.js builtins are loaded dynamically to comply with Obsidian plugin guidelines.
// This plugin is desktop-only (isDesktopOnly: true in manifest.json),
// so Node.js APIs are always available at runtime.

export type PythonExecutorConfig = {
  pythonPath: string
  timeoutMs: number
  vaultPath?: string
}

export type PythonExecutionResult = {
  stdout: string
  stderr: string
  exitCode: number
}

export async function executePython(
  code: string,
  config: PythonExecutorConfig,
): Promise<PythonExecutionResult> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- dynamic require required by Obsidian plugin guidelines
  const { spawn } = require('child_process') as typeof import('child_process')
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- dynamic require required by Obsidian plugin guidelines
  const fs = require('fs') as typeof import('fs')
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- dynamic require required by Obsidian plugin guidelines
  const os = require('os') as typeof import('os')
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- dynamic require required by Obsidian plugin guidelines
  const path = require('path') as typeof import('path')

  const tmpFile = path.join(os.tmpdir(), `cmpy_${Date.now()}.py`)
  fs.writeFileSync(tmpFile, code, 'utf8')

  return new Promise((resolve) => {
    const env: Record<string, string> = {
      ...(process.env as Record<string, string>),
      ...(config.vaultPath ? { VAULT_PATH: config.vaultPath } : {}),
    }

    const proc = spawn(config.pythonPath, [tmpFile], {
      env,
      timeout: config.timeoutMs,
    })

    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (data: Buffer) => {
      stdout += data.toString()
    })
    proc.stderr.on('data', (data: Buffer) => {
      stderr += data.toString()
    })

    proc.on('close', (exitCode: number | null) => {
      fs.unlink(tmpFile, () => {})
      resolve({ stdout, stderr, exitCode: exitCode ?? -1 })
    })

    proc.on('error', (err: Error) => {
      fs.unlink(tmpFile, () => {})
      resolve({ stdout: '', stderr: err.message, exitCode: -1 })
    })
  })
}
