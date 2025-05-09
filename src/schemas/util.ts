import { AnyZodObject, ZodType, z } from "zod"


export const errorResponseSchema = z.object({
  error: z.object({
    status: z.number().min(1).max(599),
    message: z.string().optional(),
    data: z.unknown().optional(),
  }),
})
export type ErrorResponse = z.infer<typeof errorResponseSchema>


export type StdResponse<Payload extends Record<string, unknown> | unknown[]> = {
  error?: undefined
  data: Payload
}

// export const StdResponse = z.object({
//   error: z.undefined().optional(),
//   data: z.union([z.record(z.unknown()), z.array(z.unknown())])
// })

export function StdResponse(payload: ZodType) {
  return z.object({
    error: z.undefined(),
    data: payload,
  })
  // return z.union([
  //   z.object({
  //     error: z.undefined(),
  //     data: payload,
  //   }),
  //   z.object({
  //     error: z.object({
  //       status: z.number().int(),
  //       message: z.string().optional(),
  //       data: z.unknown()
  //     }),
  //     data: z.undefined()
  //   })
  // ])
}

export function AuthenticatedRequest<Body extends AnyZodObject | undefined>(body: Body) {
  return z.object({
    accessToken: z.string(),
    body: body ?? z.undefined().optional(),
  })
}


export function isApiError(error: unknown): error is ErrorResponse["error"] {
  return errorResponseSchema.shape.error.safeParse(error).success
}
