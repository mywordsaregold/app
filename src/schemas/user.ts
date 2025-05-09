import { z } from "zod"
import { AuthenticatedRequest, StdResponse } from "./util"
import { inviteSchema } from "./invite"

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string().min(3).max(50),
})
export type User = z.infer<typeof userSchema>


export const getUsersRequestSchema = AuthenticatedRequest(undefined)
export type GetUserRequest = z.infer<typeof getUsersRequestSchema>

export const getUsersResponseSchema = StdResponse(z.array(userSchema))
export type GetUsersResponse = StdResponse<User[]>;


export const createUserRequestSchema = AuthenticatedRequest(z.object({
  inviteId: inviteSchema.shape.id,
  nickname: userSchema.shape.nickname,
}))
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>

export const createUserResponseSchema = StdResponse(userSchema)
export type CreateUserResponse = StdResponse<User>
