import type { User } from "../types";
import type { AstroCookies } from "astro";

const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export interface Session {
  token: string;
  user: User;
}

export class SessionManager {
  private cookies: AstroCookies;

  constructor(cookies: AstroCookies) {
    this.cookies = cookies;
  }

  //Crear sesión
  createSession(session: Session): void {
    this.cookies.set("auth_token", session.token, COOKIE_OPTIONS);
    this.cookies.set("user_data", JSON.stringify(session.user), {
      ...COOKIE_OPTIONS,
      httpOnly: false, //permitir acceso desde cliente
    });
  }

  getToken(): string | undefined {
    return this.cookies.get("auth_token")?.value;
  }

  getUser(): User | null {
    const userData = this.cookies.get("user_data")?.value;
    if (!userData) return null;

    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  }

  //obtener sesion completa
  getSession(): Session | null {
    const token = this.getToken();
    const user = this.getUser();

    if(!token || !user) return null;

    return { token, user };
  }

  //verificar si hay sesión activa
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  //destruir sesión
  destroySession(): void {
    this.cookies.delete('auth_token', { path: '/' });
    this.cookies.delete('user_data', { path: '/' });
  }
}

export function getSessionManager(cookies: AstroCookies): SessionManager {
  return new SessionManager(cookies)
}
