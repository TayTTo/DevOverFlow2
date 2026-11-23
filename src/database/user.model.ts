import { Schema, model, models } from 'mongoose'
import type { Document, Model } from 'mongoose'

// Users are created by Better Auth (src/lib/auth.ts) in the same `users`
// collection; this model is for reading/updating them from app code.
export interface IUser {
  name: string
  username?: string
  email: string
  emailVerified?: boolean
  bio?: string
  image?: string
  location?: string
  portfolio?: string
  reputation?: number
}
export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const User: Model<IUser> =
  (models.User as Model<IUser> | undefined) ?? model<IUser>('User', UserSchema)

export default User
