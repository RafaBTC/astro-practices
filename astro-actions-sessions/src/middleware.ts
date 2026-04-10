import { defineMiddleware } from "astro:middleware";
import { getSessionManager } from "./lib/session";

//rutas que requieren auth
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin'
];

//rutas que requieren permisos específicos
const ADMIN_ROUTES = ['/admin']

export const onRequest = defineMiddleware(async (context, next) => {
  console.log('MIDDLEWARE')
  const { url, cookies, redirect, locals } = context;
  const pathname = url.pathname;

  //crear sesión manager
  const sessionManager = getSessionManager(cookies)

  //verificar si la ruta necesita protección
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if(isProtected){
    const session = sessionManager.getSession();

    //no hay sesión, redirigir al login
    if(!session){
      return redirect(`/login?redirect=${encodeURIComponent(pathname)}`)
    }

    //verificar permisos de admin
    const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

    if(isAdminRoute && session.user.role !== 'admin'){
      return redirect('/unauthorized');
    }
    
    //al final, pasamos los datos de la sesión a locals para usar! esto es el contexto de React!
    locals.session = session;
    locals.user = session.user
  }

  //si ya está logeado, lo redirije a su dashboard
  if(pathname === '/login' && sessionManager.isAuthenticated()){
    redirect('/dashboard');
  }

  return next();
});