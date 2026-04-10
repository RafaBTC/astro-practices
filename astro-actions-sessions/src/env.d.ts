//Namespace global para Tipado de información dentro de locals
declare namespace App {
  interface Locals{
    session?: import("./lib/session").Session;
    user?: import("./types").User;
  }
}