// 环境配置
const env = {
    development: {
        baseURL: 'https://222c4da7.r9.cpolar.top'
    },
    production: {
        baseURL: 'http://47.106.245.28:8002'
    }
}

// 根据环境返回对应配置
export default function getConfig() {
    // #ifdef H5
    if (process.env.NODE_ENV === 'development') {
        return env.development;
    }
    // #endif
    
    // #ifdef APP-PLUS || MP
    // 在APP或小程序中，可以根据需要返回不同环境的配置
    return env.development;
    // #endif
    
    return env.production;
} 