import { z } from "zod"
import { StdResponse } from "./util"


export const inviteSchema = z.object({
  id: z.string(),
  phrase: z.string().regex(
    /^[A-Z0-9]{5}$/i,
    "An invite phrase consists of five letters or numbers",
  ),
  isFull: z.boolean(),
  creator: z.optional(z.object({
    nickname: z.string(),
  })),
})
export type Invite = z.infer<typeof inviteSchema>;


export type GetInvitesRequest = { id: string, phrase?: undefined } | {id?: undefined, phrase: string}
export const getInvitesResponseSchema = StdResponse(z.array(inviteSchema))
export type GetInvitesResponse = StdResponse<Invite[]>;
