//是封装和管理 HTTP 请求
import axios from 'axios';

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // API 的基础 URL，可以从环境变量中获取
    timeout: 5000, // 请求超时时间（毫秒）
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
// 在请求发送之前，拦截器会检查本地存储中是否有 token，如果有，则将其添加到请求头中作为 Authorization。
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加 token 到 headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器

instance.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么，例如统一处理响应结构
        const data = response.data;
        if (data.code === 200) {
            return data.result; // 返回实际的数据部分
        } else {
            // 处理业务逻辑错误
            console.error('API Error:', data.message);
            return Promise.reject(new Error(data.message));
        }
    },
    (error) => {
        // 对响应错误做些什么，例如网络错误、服务器错误等
        console.error('Network Error:', error);
        return Promise.reject(error);
    }
);

// 封装 GET 请求
export function get(url, params) {
    return instance.get(url, { params });
}

// 封装 POST 请求
export function post(url, data) {
    return instance.post(url, data);
}

// 封装 PUT 请求
export function put(url, data) {
    return instance.put(url, data);
}

// 封装 DELETE 请求
export function del(url) {
    return instance.delete(url);
}