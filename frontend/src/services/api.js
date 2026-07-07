import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000/api",

});

const token = localStorage.getItem("access");

if (token) {

    api.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;

}

export default api;