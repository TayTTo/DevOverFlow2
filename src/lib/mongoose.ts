import mongoose from 'mongoose'
import type { Mongoose } from 'mongoose'

// Reuse one connection across hot reloads in dev (same idea as the
// Next.js version). Server-only: import it from server functions.
interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache
}

const cached: MongooseCache = (globalForMongoose.mongooseCache ??= {
  conn: null,
  promise: null,
})

const dbConnect = async (): Promise<Mongoose> => {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined')

  if (cached.conn) return cached.conn

  cached.promise ??= mongoose
    .connect(uri, { dbName: 'devflow' })
    .catch((error: unknown) => {
      cached.promise = null
      throw error
    })

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
