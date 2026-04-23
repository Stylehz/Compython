export function migrateFrom16To17(
  data: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...data,
    version: 17,
    pythonExecutor: {
      enabled: false,
      pythonPath: 'python3',
      timeoutMs: 10000,
      requireConfirmation: true,
    },
  }
}