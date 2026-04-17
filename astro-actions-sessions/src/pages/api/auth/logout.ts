import type { APIRoute } from 'astro'
import { getSessionManager } from '../../../lib/session'
export const POST: APIRoute = async({ cookies, redirect }) => {
  const sessionManager = getSessionManager(cookies)
  sessionManager.destroySession();
  return redirect('/login')
}