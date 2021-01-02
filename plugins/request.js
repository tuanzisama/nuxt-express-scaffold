// import Vue from 'vue'
import { Message } from 'element-ui'
/***
 * axios实例封装
 */
/**
 * request config
 * @param {Boolean} withToken 是否携带Token，默认为true 
 * @param {Boolean} doNotTips 当出现非断网/超时/未知网络错误以外的问题，是否提示错误信息，默认为true
 */


export default function ({ $axios: axios }) {
    axios.defaults.baseURL = process.env.BASE_API_URL
    axios.defaults.timeout = 180000
    axios.defaults.headers = {
        contentType: 'application/json'
    }
    
    axios.proxy = (() => {
        axios.defaults.baseURL = "/proxy"
        return axios
    })()
    // response弹窗时间
    const MESSAGE_DURATION = 3000

    axios.interceptors.request.use((config) => {
        // console.info(config);
        if (config.withToken !== false) {
            config.headers['Authorization'] = 'XXX'
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    axios.interceptors.response.use((response) => {
        if (response.hasOwnProperty('data')) {
            if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer' || response.config.responseType === 'stream') {
                return Promise.resolve(response)
            } else {
                return Promise.resolve(response.data)
            }
        }
        return Promise.reject(response)

    }, (error) => {
        if (navigator.onLine === false) {
            Message({
                type: 'error',
                message: '网络已断开，请检查网络并重试。',
                duration: MESSAGE_DURATION
            });
        } else if (error.message == 'NetWork ERROR') {
            Message({
                type: 'error',
                message: error.config.url + ' 网络异常',
                duration: MESSAGE_DURATION
            });
        } else if (error.message.indexOf('timeout') >= 0) {
            Message({
                type: 'error',
                message: error.config.url + ' 请求数据超时',
                duration: MESSAGE_DURATION
            });
        } else {
            if (error.config.doNotTips !== true) {
                Message({
                    type: 'error',
                    message: error.config.url + ' 系统异常',
                    duration: MESSAGE_DURATION
                });
            }
        }
        return Promise.reject(error)
    })
}

// Vue.prototype.$axios = instance