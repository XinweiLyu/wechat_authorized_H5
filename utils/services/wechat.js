import { get } from '../request/http';
import config from '../config/wechat';

// 获取当前页面URL（去除参数）
function getCurrentPageUrl() {
    let url = window.location.href;
    if (url.indexOf('#') !== -1) {
        url = url.split('#')[0];
    }
    if (url.indexOf('?') !== -1) {
        url = url.substring(0, url.indexOf('?'));
    }
    return url;
}

// 获取URL中的参数
function getUrlParams() {
    const url = window.location.search;
    console.log(url, 'url');
    const params = new URLSearchParams(url);
    return {
        code: params.get('code'),
        state: params.get('state')
    };
}

// 存储用户信息
function saveUserInfo(userInfo) {
    localStorage.setItem('wechat_user_info', JSON.stringify(userInfo));
}

// 获取存储的用户信息
export function getStoredUserInfo() {
    const userInfo = localStorage.getItem('wechat_user_info');
    return userInfo ? JSON.parse(userInfo) : null;
}

// 清除用户信息
export function clearUserInfo() {
    localStorage.removeItem('wechat_user_info');
}

// 微信授权
export async function wechatAuth() {
    console.log(getUrlParams(), 'getUrlParams()');
    const { code } = getUrlParams();
    const storedUserInfo = getStoredUserInfo();

    // 如果已有用户信息，直接返回
    if (storedUserInfo) {
        return storedUserInfo;
    }

    // 如果没有code，重定向到微信授权页
    if (!code) {
        const redirectUri = encodeURIComponent(getCurrentPageUrl());
		// 微信后台配置，重定向跳转页面，截取code
		// TODO
		//www.baidu.com?code=jhsadfghj455565
		// 后端跳转页面时，截图路劲上的code参数，然后带着code参数去点用微信官方和接口
		//这里的意义就是去获取code，写死了我们就没有code了
        // const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=${redirectUri}&response_type=code&scope=${config.officialAccount.scope}&state=${config.officialAccount.state}#wechat_redirect`;
		const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=http://www.cocoyam.cn&response_type=code&scope=${config.officialAccount.scope}&state=${config.officialAccount.state}#wechat_redirect`;
        window.location.href = authUrl;
        return null;
    }

    try {
        // 使用code获取access_token和用户信息
        const tokenResponse = await get(config.api.getAccessToken, { code });
        if (!tokenResponse.access_token) {
            throw new Error('Failed to get access token');
        }

        // 获取用户信息
        const userInfo = await get(config.api.getUserInfo, {
            access_token: tokenResponse.access_token,
            openid: tokenResponse.openid
        });

        // 保存用户信息
        saveUserInfo(userInfo);
        return userInfo;
    } catch (error) {
        console.error('微信授权失败:', error);
        clearUserInfo();
        throw error;
    }
} 