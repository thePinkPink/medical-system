
import axios from 'axios';
import Tool from '../common/util';
import jsCookie from 'js-cookie';


const client = axios.create({
  baseURL: 'http://49.233.166.221:8080/xuptcd', 
  timeout: 5000, // request timeout
  headers: {
    // 'Content-Type': 'application/json'
  }
})

client.interceptors.request.use(function (config) {
  // config.withCredentials = true;
  if (jsCookie.get('patient_token')) {
    config.headers = {
      "Authorization": `${jsCookie.get('patient_token')}`
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


client.interceptors.response.use(
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
    client({
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

export function post (url: string, data: object, method: any = 'post') {
  return new Promise((resolve,reject) => {
    client({
      method,
      url: url,
      data: data
      // headers: { "Content-Type": "application/x-www-from-urlencoded" },
      // data: Tool.transformData(data)
    }).then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

