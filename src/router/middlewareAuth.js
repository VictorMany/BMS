import { getTokenFromCookie } from 'app/utils/utils'
/**
 * Auth middleware example.
 */
export function auth(/* { to, from, next, store } */ { next }) {
  if (!getTokenFromCookie()) { // Si no hay token, redirige al usuario al login
    return next({ name: 'login' })
  }
  return next() // Si hay token, permite la navegación
}