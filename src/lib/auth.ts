import { betterAuth } from 'better-auth'
import { APIError } from 'better-auth/api'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { MongoClient } from 'mongodb'

// Replaces NextAuth (auth.ts + app/api/auth/* + the accounts/users API
// routes it called). Better Auth stores users, accounts and sessions in
// MongoDB itself.

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.warn('[auth] MONGODB_URI is not set; sign-in and sign-up will fail.')
}

// MongoClient connects lazily, so the app still boots without a database.
const client = new MongoClient(MONGODB_URI ?? 'mongodb://127.0.0.1:27017')
const db = client.db('devflow')

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env

export const auth = betterAuth({
  // No `client` option: transactions need a replica set, which a local
  // standalone MongoDB doesn't have (the Next.js app hit this too).
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  // Each provider is enabled only when its keys are in .env.local.
  socialProviders: {
    ...(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            mapProfileToUser: (profile) => ({ username: profile.login }),
          },
        }
      : {}),
    ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            mapProfileToUser: (profile) => ({
              username: profile.name.toLowerCase().replace(/\s+/g, ''),
            }),
          },
        }
      : {}),
  },
  user: {
    // Same collection as the Mongoose `User` model (src/database), so
    // questions, answers, etc. can reference users.
    modelName: 'users',
    additionalFields: {
      username: { type: 'string', required: false, input: true },
      bio: { type: 'string', required: false, input: false },
      location: { type: 'string', required: false, input: false },
      portfolio: { type: 'string', required: false, input: false },
      reputation: {
        type: 'number',
        required: false,
        defaultValue: 0,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // The Next.js sign-up rejected duplicate usernames; keep that.
        before: async (user, ctx) => {
          const username = (user as { username?: string }).username
          if (!username) return

          const taken = await db.collection('users').findOne({ username })
          if (!taken) return

          if (ctx?.path === '/sign-up/email') {
            throw new APIError('BAD_REQUEST', {
              message: 'Username already exists',
            })
          }
          // OAuth sign-in: don't block it, pick a free variant instead.
          const suffix = Math.floor(1000 + Math.random() * 9000)
          return { data: { ...user, username: `${username}${suffix}` } }
        },
      },
    },
  },
  plugins: [tanstackStartCookies()],
})
