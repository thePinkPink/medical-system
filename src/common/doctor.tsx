
import axios from 'axios';
import jsCookie from 'js-cookie';


const admin = axios.create({
  baseURL: 'http://49.233.166.221:8080/xuptcd', 
  timeout: 5000, // request timeout
  headers: {
    // 'Content-Type': 'application/json'
  }
})

admin.interceptors.request.use(function (config) {
  if (jsCookie.get('doctor_token')) {
    config.headers = {
      "Authorization": `${jsCookie.get('doctor_token')}`
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


admin.interceptors.response.use(
  response => {
   return response
  },
  error => {
   return Promise.reject(error)
  }
);


export function ajax (method: any = 'get', url: string, data?: object, login: boolean = false) {
  const action = method.toUpperCase() === 'GET' ? 'params' : 'data';
  return new Promise((resolve,reject) => {
    admin({
      method,
      url: url,
      [action]: data
    })
    .then(response => {
      if (login) {
        resolve(response);
      } else {
        resolve(response.data);
      }
      return response;
    })
    .catch(err => {
      reject(err)
    })
  })

}

