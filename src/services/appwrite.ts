import { Client, Account, OAuthProvider, AppwriteException, Models } from "appwrite"
import { APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID } from "../environment/variables"
import { completeUrl, ROUTER_PATHS } from "../routes"

export type AppwriteUser = Models.User<Models.Preferences>

const client = new Client()
  .setEndpoint(APPWRITE_API_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

const account = new Account(client)


export function startLogin() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    completeUrl(ROUTER_PATHS.LOGIN_SUCCESS),
    completeUrl(ROUTER_PATHS.LOGIN_FAILURE),
    [], // no scopes are needed
  )
}

export async function getCurrentSession() {
  try {
    const session = await account.getSession("current")
    return session
  } catch (error) {
    if (isAppwriteException(error) && error.code === 401 && error.type === "general_unauthorized_scope") {
      return undefined
    }
    throw error
  }
}

export async function getUser(): Promise<AppwriteUser | undefined> {
  try {
    const user = await account.get()
    return user
  } catch (error) {
    if (isAppwriteException(error) && error.code === 401 && error.type === "general_unauthorized_scope") {
      return undefined
    }
    throw error
  }
}

export async function getAccessToken() {
  const jwt = await account.createJWT()
  return jwt
}

function isAppwriteException(error: unknown): error is AppwriteException {
  return !!error && typeof error === "object" && "code" in error && "type" in error
}

