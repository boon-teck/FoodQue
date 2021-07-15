import Axios from 'axios'

let baseUrl ='http://localhost:8000'

Axios.interceptors.request.use(
    config  => {
        if(localStorage.access){
            config.headers.Authorization = `Bearer ${localStorage.access}`
        } else {
           delete config.headers.Authorization
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//if access token expire
Axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const originalRequest = error.config;
        let refreshToken = localStorage.refresh;
        console.log(error.response.detail)
        if( refreshToken &&
            error.response.status === 401 &&
            error.response?.data.detail !== "Token is invalid or expired" &&
            !originalRequest._retry
        ){
            originalRequest._retry = true
            return Axios.post(`${baseUrl}/api/token/refresh/`, { refresh : refreshToken})
                .then(res => {
                    if( res.status === 200){
                        localStorage.setItem("access", res.data.access)
                        return Axios(originalRequest);
                    }
                })
        }else{
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
        }
        return Promise.reject(error)
    })

export default Axios
