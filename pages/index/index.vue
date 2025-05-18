<template>
  <view>
    <view class="header">
      <text class="title">用户报告</text>
    </view>
    <view class="user-info" v-if="userInfo">
      <view class="user-avatar">
        <image :src="userInfo.headimgurl" mode="aspectFill"></image>
      </view>
      <view class="user-details">
        <text class="nickname">{{ userInfo.nickname }}</text>
        <text class="other-info"
          >{{ userInfo.province }} {{ userInfo.city }}</text
        >
      </view>
    </view>
    <view class="loading" v-else-if="loading">
      <text>加载中...</text>
    </view>
    <view class="actions">
      <button @click="viewHistory">查看历史检测记录</button>
      <button @click="viewPdfReport">查看PDF报告</button>
    </view>
  </view>
</template>

<script>
import { wechatAuth, getStoredUserInfo } from '../../utils/services/wechat';

export default {
  data() {
    return {
      userInfo: null,
      loading: true,
    };
  },
  onLoad() {
    this.initializeAuth();
  },
  methods: {
    async initializeAuth() {
      try {
        this.loading = true;
        // 尝试获取已存储的用户信息
        const storedInfo = getStoredUserInfo();
        if (storedInfo) {
          console.log(4);
          this.userInfo = storedInfo;
          this.loading = false;
          return;
        }

        // 进行微信授权
        const userInfo = await wechatAuth();
        console.log(1);
        if (userInfo) {
          this.userInfo = userInfo;
        }
      } catch (error) {
        uni.showToast({
          title: '授权失败，请重试',
          icon: 'none',
        });
        console.error('授权失败:', error);
      } finally {
        this.loading = false;
      }
    },
    viewHistory() {
      uni.navigateTo({
        url: '/pages/index/historyRecords/historyRecords',
      });
    },
	
    // viewPdfReport() {
    //   // 实现查看PDF报告的逻辑
    //   uni.showToast({
    //     title: '功能开发中',
    //     icon: 'none',
    //   });
    // },
	viewPdfReport() {
	    // 使用本地PDF文件作为占位符
	    const filePath = '/static/report.pdf';
	    wx.openDocument({
	      filePath: filePath,
	      success: function (res) {
	        console.log('打开文档成功');
	      },
	      fail: function (err) {
	        console.error('打开文档失败', err);
	      }
	    });
	  },
	
	
	
  },
};
</script>

<style>
.header {
  text-align: center;
  margin: 20px 0;
}

.title {
  font-size: 24px;
  color: #333;
}

.user-info {
  margin: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.user-avatar image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.user-details {
  flex: 1;
}

.nickname {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
}

.other-info {
  font-size: 14px;
  color: #666;
}

.loading {
  text-align: center;
  margin: 20px;
  color: #666;
}

.actions {
  margin-top: 30px;
  padding: 0 20px;
}

button {
  margin-bottom: 15px;
  background-color: #07c160;
  color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  font-size: 16px;
}

button:active {
  opacity: 0.8;
}
</style>
