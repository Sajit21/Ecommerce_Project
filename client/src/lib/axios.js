


import axios from  "axios"
//import.meta.mode is a special variable in Vite (a modern frontend build tool). 

const axiosInstance =axios.create
({
    baseURL :import.meta.mode==="development" ? "http://localhost:3000/api" : "/api",
    withCredentials:true
})


export default axiosInstance;