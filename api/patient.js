import { get, post, put, del } from "../utils/request/http";
// 查看列表
export const getUserList = (params) => {
    return get(`/report/wechat-reports/`,params);
};
// 查看Pdf
export const getUserPdf = (params) => {
    return get(`/report/wechat-export`,params);
};