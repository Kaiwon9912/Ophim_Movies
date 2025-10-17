import axios from "axios";

export const api = axios.create({
    baseURL: "https://ophim1.com",
    headers:{"Content-Type": "application/json",}

    
})

