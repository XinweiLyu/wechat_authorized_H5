// 处理微信相关服务
import { get } from '../request/http';
import config from '../config/wechat';

// 获取当前页面URL（去除#和?后面的参数），，用于生成微信授权的重定向URL
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

// 获取URL中的参数,在微信授权过程中，获取微信返回的code用于后续的API请求。
function getUrlParams() {
    const url = window.location.search; 
    console.log(url, 'url');
    const params = new URLSearchParams(url);
    return {
        code: params.get('code'),
        state: params.get('state')
    };
}

// 存储用户信息到本地存储中，用于在用户授权后保存用户信息，以便后续使用。
function saveUserInfo(userInfo) {
    localStorage.setItem('wechat_user_info', JSON.stringify(userInfo));
}

// 从本地存储中获取用户信息，检查用户是否已经授权并获取过信息。wechatAuth() 调用 getUrlParams()，把 code 取出来。
export function getStoredUserInfo() {
    const userInfo = localStorage.getItem('wechat_user_info');
    return userInfo ? JSON.parse(userInfo) : null;
}

// 清除本地存储中的用户信息，在用户退出或授权失败时清除用户信息。
export function clearUserInfo() {
    localStorage.removeItem('wechat_user_info');
}

// 微信授权
// 流程:
// 检查本地是否已有用户信息，如果有则直接返回。
// 如果没有code，则重定向到微信授权页面。
// 使用code获取access_token和用户信息。
// 保存用户信息到本地存储。
// 如果任何步骤失败，清除用户信息并抛出错误。
export async function wechatAuth() {
    console.log(getUrlParams(), 'getUrlParams()');
    const { code } = getUrlParams();
    const storedUserInfo = getStoredUserInfo();

    // 如果已有用户信息，直接返回，不需要重新授权。
    if (storedUserInfo) {
        return storedUserInfo;
    }

    // 如果没有code，重定向到微信授权页
    if (!code) {
        // 获取当前页面URL（去除#和?后面的参数），用于生成微信授权的重定向URL
        const redirectUri = encodeURIComponent(getCurrentPageUrl()); 

        //重定向到微信授权页面:构建微信授权URL（authUrl），包括appid、redirect_uri、response_type=code、scope、state等参数。
		// 微信后台配置，重定向跳转页面，截取code
		// TODO
		//www.baidu.com?code=jhsadfghj455565
		// 后端跳转页面时，截图路劲上的code参数，然后带着code参数去点用微信官方和接口
		//这里的意义就是去获取code，写死了我们就没有code了
		// var wxUrl =
		// 	'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
		// 	appid +
		// 	'&redirect_uri=' +
		// 	local +
		// 	'&response_type=code' +
		// 	'&scope=snsapi_base';
			
		// 定向到前端url， 获取请求参数里的code 然后发送到后端http://277fbfd6.cpolar.top/user/wechat-login/?code={code}。
		//http://767842ijj.cpolar.top 后面加路径，用路径去管理？然后通过路径访问到的东西避让说发了一个请求参数code,把code 获取了通过axios 发到后端接口。
		const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=http://767842ijj.cpolar.top&response_type=code&scope=${config.officialAccount.scope}`;
        //const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=${redirectUri}&response_type=code&scope=${config.officialAccount.scope}`; 
		//const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=http://277fbfd6.cpolar.top/user/wechat-login/&response_type=code&scope=${config.officialAccount.scope}&state=${config.officialAccount.state}#wechat_redirect`;
		//const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.officialAccount.appId}&redirect_uri=http://www.cocoyam.cn&response_type=code&scope=${config.officialAccount.scope}&state=${config.officialAccount.state}#wechat_redirect`;
		console.log(window.location.href,'window.location.href')
        console.log('生成的微信授权链接:', authUrl);
        window.location.href = authUrl;// 改成异步请求、
        return null;
    }
	

    try {
        // 使用code获取access_token和用户信息
        const tokenResponse = await get(config.api.getAccessToken, { code }); // 获取code
        // 保存用户信息
        console.log(tokenResponse.openid, 'tokenResponse');
        localStorage.setItem('token', tokenResponse.access_token); // 赋值

        saveUserInfo(tokenResponse);
        return tokenResponse;
    } catch (error) {
        console.error('微信授权失败:', error);
        clearUserInfo();
        throw error;
    }
}

export { getUrlParams };

