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

export function verifyAuthForDetailEquipment({ to, next }) {
  const token = getTokenFromCookie();
  if (!token) { // Si no hay token, redirige al usuario al login con el id de la ruta actual
    const id = to.params.id;
    return next({ name: 'login-equipment', params: { id: id } });
  }
  return next(); // Si hay token, permite la navegación
}