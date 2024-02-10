import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar';
import { setAuthHeader } from 'src/api/auth';
import { getTokenFromCookie } from 'app/utils/utils';

const api = axios.create({ baseURL: 'https://bmsystemll.com' })

setAuthHeader(getTokenFromCookie()); // Establece las cabeceras de Axios con el token, si está disponible

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //   

  api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error && error.response && error.response.status === 401) {
      // send to LOGIN
      Notify.create({
        message: 'Su sesión ha caducado',
        caption: 'Redireccionando a inicio de sesión',
        classes: 'border-rounded alert-container',
        avatar: '../src/assets/png/warning.png'
      });
      router.push({ name: 'login' });
    } else if (!error.response) {
      Notify.create({
        message: 'Ocurrió una falla en la red',
        caption: 'Inténtalo de nuevo más tarde',
        classes: 'border-rounded alert-container'
      });
    } else if (error.response.status === 404) {
      Notify.create({
        message: 'El recurso no existe',
        caption: 'Reporte este error',
        classes: 'border-rounded alert-container',
        avatar: '../src/assets/png/warning.png'
      });
    } else {
      Notify.create({
        message: 'Se produjo un error en la solicitud',
        caption: error?.response?.data?.details ? error?.response?.data?.details : 'Inténtalo de nuevo más tarde',
        classes: 'border-rounded alert-container',
        avatar: '../src/assets/png/warning.png'
      });
      // showWarning(this.$q, { msg: error.response ? error.response.data.message : error });
      if (error?.response?.data?.message) {
        Notify.create({
          message: 'Se produjo un error en la solicitud',
          caption: error.response.data.message,
          classes: 'border-rounded alert-container',
          avatar: '../src/assets/png/warning.png'
        });
      }
    }
    return Promise.reject(error);
  });
})

export { api }
