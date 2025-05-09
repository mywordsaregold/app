import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { ZodType, z } from "zod"
import {
  GetInvitesRequest,
  GetInvitesResponse,
  getInvitesResponseSchema,
} from "../schemas/invite"
import { ErrorResponse, errorResponseSchema, StdResponse } from "../schemas/util"
import {
  CreateUserRequest,
  createUserRequestSchema,
  CreateUserResponse,
  createUserResponseSchema,
  GetUserRequest,
  GetUsersResponse,
  getUsersResponseSchema,
} from "../schemas/user"
import { usersTag } from "./tags"

function accessTokenHeader(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` }
}

function validateResponse<Schema extends ZodType>(
  hookName: string,
  schema: Schema,
) {
  type Payload = z.infer<Schema> extends StdResponse<infer Payload>
    ? Payload
    : never
  return (response: unknown): Payload => {
    const result = schema.safeParse(response)
    if (!result.success) {
      console.warn(`Failed to parse '${hookName}'.`, response, result.error)
    }
    const resultData = result.data as StdResponse<Payload>
    return resultData !== undefined && "data" in resultData
      ? resultData.data
      : resultData
  }
}

function validateErrorResponse(hookName: string) {
  return (response: FetchBaseQueryError) => {
    const result = errorResponseSchema.safeParse(response.data)
    if (result.success) {
      return (response.data as ErrorResponse).error
    } else {
      console.warn(
        `Failed to parse response into '${hookName}' schema`,
        result.error,
        response.data,
      )
      return response.data
    }
  }
}

// Define a service using a base URL and expected endpoints
export const gatewayApi = createApi({
  reducerPath: "gatewayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: ({ mutation, query }) => ({
    createUser: mutation<CreateUserResponse, CreateUserRequest>({
      invalidatesTags: () => [ usersTag.list ],
      query: args => ({
        method: "POST",
        url: "/users",
        headers: accessTokenHeader(args.accessToken),
        body: createUserRequestSchema.parse(args).body,
      }),
      transformErrorResponse: validateErrorResponse("createUserError"),
      transformResponse: validateResponse(
        "createUserResponse",
        createUserResponseSchema,
      ),
    }),
    getInvites: query<GetInvitesResponse["data"], GetInvitesRequest>({
      query: ({ id, phrase }) => ({
        url: "/invites",
        params: { id, phrase },
      }),
      transformErrorResponse: validateErrorResponse("getInvitesError"),
      transformResponse: validateResponse(
        "getInvitesResponse",
        getInvitesResponseSchema,
      ),
    }),
    getMyUser: query<GetUsersResponse["data"], GetUserRequest>({
      providesTags: result => [
        usersTag.list,
        ...(result?.map(user => usersTag.specific(user.id)) ?? []),
      ],
      query: ({ accessToken }) => ({
        url: "/users",
        headers: accessTokenHeader(accessToken),
      }),
      transformErrorResponse: validateErrorResponse("getMyUserError"),
      transformResponse: validateResponse(
        "getMyUserResponse",
        getUsersResponseSchema,
      ),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateUserMutation, useGetInvitesQuery, useGetMyUserQuery } =
  gatewayApi
