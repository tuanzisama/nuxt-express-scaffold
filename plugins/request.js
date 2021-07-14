var contants = require('../utils/common/constant')
const proxyPrefix = contants("REVERSE_PROXY_PREFIX", '/')

/**
 * request config
 * @param {Boolean} withToken Add Token in Header when requesting,  default is true 
 */
export default function ({ $axios: axios }) {
    axios.defaults.baseURL = process.env.BASE_API_URL
    axios.defaults.timeout = 180000
    axios.defaults.headers = {
        contentType: 'application/json'
    }

    axios.proxy = (() => {
        axios.defaults.baseURL = proxyPrefix
        return axios
    })()

    axios.interceptors.request.use((config) => {
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
        return Promise.reject(error)
    })
}

// Vue.prototype.$axios = instance