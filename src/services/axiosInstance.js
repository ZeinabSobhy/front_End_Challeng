import axios from "axios";

export default function (history = null) {
    let baseUrl = 'https://plotter-task.herokuapp.com/'
    let headers = {
        "Content-Type": "application/json",
    }
    const axiosInstance = axios.create({
        baseURL:baseUrl,
        headers,
    });
    return axiosInstance;
}
