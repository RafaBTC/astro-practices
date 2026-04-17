import type { APIRoute } from "astro";
import { authService } from "../../../services/authService";
import { getSessionManager } from "../../../lib/session";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("pass")?.toString();
    const redirectUrl = formData.get("redirect")?.toString() || "/dashboard";

    if (!email || !password) return redirect("login?error=Datos incompletos");

    //aquí se llama al backend
    const result = await authService.login({ email, password });

    if (!result.success || !result.data)
      return redirect(
        `/login?error=${encodeURIComponent(result.error || "Error de autenticación")}`,
      );

    //Se crea la sesión
    const sessionManager = getSessionManager(cookies);
    sessionManager.createSession({
      token: result.data.token,
      user: result.data.user,
    });

    return redirect(redirectUrl);
  } catch (e){
    console.error('Login error:', e);
    return redirect('/login?error=Error del servidor');
  }
};
