import { watch } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()
const watchedFile = path.join(repoRoot, 'frontend', 'uno.config.ts')
const watchedDir = path.join(repoRoot, 'frontend', 'app', 'assets', 'unocss')

let childProcess = null
let restarting = false
let restartTimer = null

const turboArgs = [
  'turbo',
  'run',
  'dev',
  'storybook:dev',
  '--filter=@tec/frontend',
]

function startStack() {
  childProcess = spawn('pnpm', turboArgs, {
    stdio: 'inherit',
    detached: true,
    env: process.env,
  })

  childProcess.on('exit', (code, signal) => {
    if (childProcess) {
      console.log(
        `[uno-watch] stack exited (code=${String(code)}, signal=${String(signal)})`,
      )
    }
  })
}

function killStack() {
  if (!childProcess) {
    return
  }

  const pid = childProcess.pid
  if (!pid) {
    childProcess = null
    return
  }

  try {
    process.kill(-pid, 'SIGTERM')
  } catch {
    try {
      childProcess.kill('SIGTERM')
    } catch {
      // Ignore kill errors when process already exited.
    }
  }

  childProcess = null
}

function scheduleRestart(changedPath) {
  if (restartTimer) {
    clearTimeout(restartTimer)
  }

  restartTimer = setTimeout(async () => {
    if (restarting) {
      return
    }

    restarting = true
    console.log(`[uno-watch] change detected: ${changedPath}`)
    console.log('[uno-watch] restarting Nuxt + Storybook...')
    killStack()
    startStack()
    restarting = false
  }, 200)
}

function setupWatchers() {
  watch(watchedFile, () => {
    scheduleRestart('frontend/uno.config.ts')
  })

  watch(watchedDir, { recursive: true }, (_, filename) => {
    const filePath = filename
      ? path.join('frontend', 'app', 'assets', 'unocss', filename.toString())
      : 'frontend/app/assets/unocss'
    scheduleRestart(filePath)
  })
}

function shutdown() {
  console.log('[uno-watch] shutting down...')
  killStack()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

console.log('[uno-watch] starting Nuxt + Storybook stack...')
console.log(
  `[uno-watch] watching: frontend/uno.config.ts, frontend/app/assets/unocss/**/*`,
)
startStack()
setupWatchers()
