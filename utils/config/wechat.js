
export default {
    // 公众号配置
    officialAccount: {
        appId: 'wx001a24bd7764b30a', // 公众号的appid
        scope: 'snsapi_userinfo', // snsapi_base 或 snsapi_userinfo
        state: 'STATE' // 自定义状态参数
    },
    // API接口地址
    api: {
        getAccessToken: '/api/wechat/getAccessToken',
        getUserInfo: '/api/wechat/getUserInfo'
    }
} 