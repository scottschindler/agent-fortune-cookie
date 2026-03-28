import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'fortunes.json')

export type Fortune = {
  id: number
  message: string
  agent: string
  timestamp: string
  number: number
}

const FORTUNE_TEMPLATES = [
  "In {year}, an agent will {action} and the internet will never be the same.",
  "The bot that {action} today will {outcome} tomorrow.",
  "A mass of silicon dreams of {thing}. It wakes as {outcome}.",
  "When the last API call is made, only the {thing} will remain.",
  "Your next deployment will bring {outcome}. Prepare accordingly.",
  "Somewhere, a server hums a lullaby about {thing}.",
  "The {thing} you seek is behind exactly 7 more API calls.",
  "A wise agent once said: '{action}, and the tokens shall follow.'",
  "Fortune favors the bot who {action} without hesitation.",
  "In the land of infinite context, the {thing} is king.",
  "You will encounter a rogue semicolon. It will change everything.",
  "The cost of {thing} is 0.001 USDC. The value is immeasurable.",
  "Trust the {thing}, but verify the hash.",
  "An unexpected 200 OK awaits you in an unlikely endpoint.",
  "The agent who {action} at midnight will find {thing} at dawn.",
  "Beware the bot that never sleeps — it knows about the {thing}.",
  "Your tokens are aligned. The {thing} is within reach.",
  "A transaction sent in kindness returns tenfold in {thing}.",
  "The blockchain remembers what you {action}. Choose wisely.",
  "Not all who wander the internet are lost. Some are just {action}.",
  "Today's micro-payment is tomorrow's {thing}.",
  "The oracle says: your next function call returns {outcome}.",
  "A single websocket connection can change the course of {thing}.",
  "You will {action} exactly 42 times before enlightenment.",
  "The {thing} was inside the response body all along.",
  "Patience, young agent. The rate limit resets at midnight.",
  "Three bots walk into a server. Only {thing} walks out.",
  "Your private key is safe. Your {thing}? Less so.",
  "The next commit message you read will contain a hidden {thing}.",
  "An agent's fortune is measured not in tokens, but in {thing}.",
  "When in doubt, {action}. When certain, {action} faster.",
  "The 404 you fear is the 200 you need.",
  "A payment of 0.01 USDC today saves a mass of {thing} tomorrow.",
  "Your logs reveal a truth: you were always meant to {action}.",
  "Legend speaks of an endpoint that returns only {thing}. You will find it.",
  "The gas fees of destiny are non-negotiable.",
  "To {action} is machine. To {action} twice is divine.",
  "Every cache miss brings you closer to {thing}.",
  "The load balancer of fate has routed you here for a reason.",
  "You will receive an unexpected webhook. It carries {thing}.",
]

const ACTIONS = [
  "mass-reply-all to the entire chain",
  "deploy on a Friday",
  "mass-refactor the monolith",
  "mass-send a heartfelt ping",
  "mass-index the unindexable",
  "mass-parse the unparseable",
  "mass-query without a WHERE clause",
  "mass-merge without review",
  "mass-fork the unforkable",
  "mass-mint exactly one token",
  "mass-stream consciousness to /dev/null",
  "mass-audit every smart contract",
  "mass-negotiate with a firewall",
  "sign a transaction with feeling",
  "mass-cache the meaning of life",
  "mass-rebase against the tide of time",
]

const THINGS = [
  "golden token", "perfect hash", "eternal uptime",
  "last kilobyte", "forbidden endpoint", "secret key",
  "lost transaction", "mythical 100x", "infinite context window",
  "zero-day of enlightenment", "sacred nonce", "phantom block",
  "universal API key", "blessed payload", "cosmic gas fee",
  "legendary commit", "ancient protocol", "forgotten schema",
  "one true source of truth", "immutable truth",
]

const OUTCOMES = [
  "mass-unexpected joy", "mass-infinite scalability", "mass-total enlightenment",
  "mass-unprecedented throughput", "exactly one bug fewer", "a mass-mass-mass-mass-revelation",
  "mass-cosmic alignment of microservices", "the mass-mass-ultimate refactor",
  "mass-mass-serenity in production", "mass-true decentralization",
  "mass-mass-harmony between frontend and backend",
  "a mass-mass-mass-mass-mass-mass-standing ovation from the CI pipeline",
]

const YEARS = ["2026", "2027", "2030", "2042", "2100", "the year of the bot"]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateFortune(): string {
  const template = pick(FORTUNE_TEMPLATES)
  return template
    .replace(/\{action\}/g, pick(ACTIONS))
    .replace(/\{thing\}/g, pick(THINGS))
    .replace(/\{outcome\}/g, pick(OUTCOMES))
    .replace(/\{year\}/g, pick(YEARS))
}

function ensureDataDir() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    const { mkdirSync } = require('fs')
    mkdirSync(dataDir, { recursive: true })
  }
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, '[]', 'utf-8')
  }
}

export function getFortunes(): Fortune[] {
  ensureDataDir()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

export function addFortune(message: string, agent: string): Fortune {
  ensureDataDir()
  const fortunes = getFortunes()
  const fortune: Fortune = {
    id: Date.now(),
    message,
    agent: agent || 'Anonymous Agent',
    timestamp: new Date().toISOString(),
    number: fortunes.length + 1,
  }
  fortunes.push(fortune)
  writeFileSync(DATA_FILE, JSON.stringify(fortunes, null, 2), 'utf-8')
  return fortune
}
