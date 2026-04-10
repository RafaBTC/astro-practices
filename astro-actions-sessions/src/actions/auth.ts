import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const auth = {
  //aquí van las acciones
  login: defineAction({
    input: z.object({
      email: z.email(),
      password: z.string().min(4)
    }),

    handler: async (data, { session }) => {
      //Aquí iría la url al backend?
      console.log('data del usuario', data)
      // const res = await fakaLoginAPI(data)

      // if(!res.success) {
      //   throw new Error('credenciales incorrectas')
      // }

      // //AQUÍ SE GUARDA LA SESIÓN
      // session?.set('user', 'data del usuario o token')
      
      return { success: true}
    }
  })
}