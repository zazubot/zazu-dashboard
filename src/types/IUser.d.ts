export interface IUser {
  _id: string
  name: string
  phone: string
  avatar: string
  email_verified: boolean
  language: string
  password: string
  type: string
  email: string
  active: boolean
  createdAt: Date
}

export interface IUserParams {
  page?: number
  search?: string
  type?: string
}
