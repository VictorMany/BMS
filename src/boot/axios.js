import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar';
import { setAuthHeader } from 'src/api/auth';
import { getTokenFromCookie } from 'app/utils/utils';
const warning = new URL('../../src/assets/png/warning.png', import.meta.url).href

const api = axios.create({ baseURL: 'https://be.bmsystemll.com' })

setAuthHeader(getTokenFromCookie());

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  api.interceptors.response.use(function (response) {
    const { headers } = response;

    if (headers?.['new-token'] && headers?.['new-token'] != 'null') {
      setAuthHeader(headers['new-token']);
    }

    return response;
  }, function (error) {
    handleErrorResponse(error, router);
    return Promise.reject(error);
  });
})

function handleErrorResponse(error, router) {
  const message = getErrorMessage(error);
  const caption = getErrorCaption(error);

  Notify.create({
    message,
    caption,
    classes: 'border-rounded alert-container',
    avatar: warning
  });

  if (shouldRedirectToLogin(error)) {
    router.push({ name: 'login' });
  }
}

function getErrorMessage(error) {
  if (error && error.response && error.response.status === 404) {
    return 'El recurso no existe';
  } else if (!error.response) {
    return 'Ocurrió una falla en la red';
  } else {
    return error?.response?.data?.message || 'Se produjo un error en la solicitud';
  }
}

function getErrorCaption(error) {
  if (!error.response) {
    return 'Inténtalo de nuevo más tarde';
  } else if (error.response.status === 401 && error.response?.data?.message === 'Credenciales inválidas') {
    return 'Redireccionando a inicio de sesión';
  } else {
    return error?.response?.data?.details || 'Inténtalo de nuevo más tarde';
  }
}

function shouldRedirectToLogin(error) {
  return error && error.response && error.response.status === 401;
}

export { api }
