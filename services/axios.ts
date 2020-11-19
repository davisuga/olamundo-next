import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 10000,
});

// interface Iconfig {
//     baseURL: string;
//     headers?: Headers;
//     cors?: "cors" | "no-cors";
// }
// const apiFactory = (config: Iconfig) => {
//     const { baseURL, headers, cors } = config;

//     const get = async (url: string) => {
//         const rawResponse = await fetch(baseURL + url, {
//             mode: cors,
//             headers,
//         });
//         if (rawResponse.body) return await rawResponse.json();
//     };
//     const post = async (url: string, body: any) => {
//         const rawResponse = await fetch(baseURL + url, {
//             mode: cors,
//             headers,
//             method: "POST",
//             body,
//         });
//         if (rawResponse.body) return await rawResponse.json();
//     };
//     return {
//         post,
//         get,
//     };
// };

// const api = apiFactory({
//     baseURL: "http://localhost:8080/",

//     cors: "no-cors",
// });

export default api;
