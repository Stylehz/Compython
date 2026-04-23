import { spawn } from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export type PythonExecutorConfig = {
  pythonPath: string      // ex: "python3" ou "/usr/bin/python3"
  timeoutMs: number       // ex: 10000
  vaultPath?: string      // passado como variável de ambiente VAULT_PATH
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
  // Escreve o código num arquivo temp (mais seguro que -c para scripts longos)
  const tmpFile = path.join(os.tmpdir(), `smtcmp_${Date.now()}.py`)
  fs.writeFileSync(tmpFile, code, 'utf8')

  return new Promise((resolve) => {
    const env: Record<string, string> = {
      ...process.env as Record<string, string>,
      ...(config.vaultPath ? { VAULT_PATH: config.vaultPath } : {}),
    }

    const proc = spawn(config.pythonPath, [tmpFile], {
      env,
      timeout: config.timeoutMs,
    })

    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (data: Buffer) => { stdout += data.toString() })
    proc.stderr.on('data', (data: Buffer) => { stderr += data.toString() })

    proc.on('close', (exitCode: number | null) => {
      fs.unlink(tmpFile, () => {}) // cleanup silencioso
      resolve({ stdout, stderr, exitCode: exitCode ?? -1 })
    })

    proc.on('error', (err: Error) => {
      fs.unlink(tmpFile, () => {})
      resolve({ stdout: '', stderr: err.message, exitCode: -1 })
    })
  })
}