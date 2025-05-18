"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request_http = require("../request/http.js");
const utils_config_wechat = require("../config/wechat.js");
function getCurrentPageUrl() {
  let url = window.location.href;
  if (url.indexOf("#") !== -1) {
    url = url.split("#")[0];
  }
  if (url.indexOf("?") !== -1) {
    url = url.substring(0, url.indexOf("?"));
  }
  return url;
}
function getUrlParams() {
  const url = window.location.search;
  common_vendor.index.__f__("log", "at utils/services/wechat.js:19", url, "url");
  const params = new URLSearchParams(url);
  return {
    code: params.get("code"),
    state: params.get("state")
  };
}
function saveUserInfo(userInfo) {
  localStorage.setItem("wechat_user_info", JSON.stringify(userInfo));
}
function getStoredUserInfo() {
  const userInfo = localStorage.getItem("wechat_user_info");
  return userInfo ? JSON.parse(userInfo) : null;
}
function clearUserInfo() {
  localStorage.removeItem("wechat_user_info");
}
async function wechatAuth() {
  common_vendor.index.__f__("log", "at utils/services/wechat.js:45", getUrlParams(), "getUrlParams()");
  const { code } = getUrlParams();
  const storedUserInfo = getStoredUserInfo();
  if (storedUserInfo) {
    return storedUserInfo;
  }
  if (!code) {
    encodeURIComponent(getCurrentPageUrl());
    window.location.href = authUrl;
    return null;
  }
  try {
    const tokenResponse = await utils_request_http.get(utils_config_wechat.config.api.getAccessToken, { code });
    if (!tokenResponse.access_token) {
      throw new Error("Failed to get access token");
    }
    const userInfo = await utils_request_http.get(utils_config_wechat.config.api.getUserInfo, {
      access_token: tokenResponse.access_token,
      openid: tokenResponse.openid
    });
    saveUserInfo(userInfo);
    return userInfo;
  } catch (error) {
    common_vendor.index.__f__("error", "at utils/services/wechat.js:84", "微信授权失败:", error);
    clearUserInfo();
    throw error;
  }
}
exports.getStoredUserInfo = getStoredUserInfo;
exports.wechatAuth = wechatAuth;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/services/wechat.js.map
