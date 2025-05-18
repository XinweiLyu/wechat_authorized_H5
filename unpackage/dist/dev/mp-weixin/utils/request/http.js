"use strict";
const common_vendor = require("../../common/vendor.js");
const instance = common_vendor.axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // API 的基础 URL，可以从环境变量中获取
  timeout: 5e3,
  // 请求超时时间（毫秒）
  headers: {
    "Content-Type": "application/json"
  }
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 200) {
      return data.result;
    } else {
      common_vendor.index.__f__("error", "at utils/request/http.js:37", "API Error:", data.message);
      return Promise.reject(new Error(data.message));
    }
  },
  (error) => {
    common_vendor.index.__f__("error", "at utils/request/http.js:43", "Network Error:", error);
    return Promise.reject(error);
  }
);
function get(url, params) {
  return instance.get(url, { params });
}
exports.get = get;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/request/http.js.map
