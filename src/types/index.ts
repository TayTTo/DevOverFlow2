export interface Tag {
  _id: string
  name: string
}

export interface Author {
  _id: string
  name: string
  image: string
}

export interface Question {
  _id: string
  title: string
  description: string
  tags: Tag[]
  author: Author
  upvotes: number
  views: number
  answers: number
  createdAt: Date
}

export type ActionResponse<T = null> = {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: Record<string, string[]>
  }
  status?: number
}

export type SuccessResponse<T = null> = ActionResponse<T> & { success: true }
export type ErrorResponse = ActionResponse<undefined> & { success: false }
