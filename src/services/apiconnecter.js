import axios from "axios"

export const axiosInstance = axios.create({});
const Base_Url = "https://love-lyrics-backend.vercel.app/api/v1/";
// const Base_Url = "http://localhost:4000/api/v1/";
export const apiConnecter = (method, url, bodyData, headers, params) => {
    console.log(Base_Url,url);
    return axiosInstance({
        method:`${method}`,
        url:`${Base_Url}${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}
