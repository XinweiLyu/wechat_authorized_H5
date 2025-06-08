<template>
  <view class="chat-container">
    <!-- 用户卡片区域 -->
    <view class="user-card">
      <text class="user-name">张三</text>
      <button class="chat-btn" @click="showChat">AI对话</button>
    </view>
    
    <!-- H5端使用iframe -->
    <!-- #ifdef H5 -->
    <view class="iframe-container" v-if="showChatFrame">
      <view class="iframe-header">
        <text class="chat-title">AI助手</text>
        <text class="close-btn" @click="hideChat">✕</text>
      </view>
      <iframe
        :src="chatUrl"
        class="chat-iframe"
        frameborder="0"
        allow="microphone">
      </iframe>
    </view>
    <!-- #endif -->
    
    <!-- 小程序端使用web-view -->
    <!-- #ifdef MP -->
    <view class="chat-modal" v-if="showChatFrame">
      <view class="chat-content">
        <view class="chat-header">
          <text class="chat-title">AI助手</text>
          <text class="close-btn" @click="hideChat">✕</text>
        </view>
        <web-view 
          :src="chatUrl"
          class="chat-webview">
        </web-view>
      </view>
    </view>
    <!-- #endif -->
    
    <!-- App端使用web-view -->
    <!-- #ifdef APP-PLUS -->
    <view class="chat-modal" v-if="showChatFrame">
      <view class="chat-content">
        <view class="chat-header">
          <text class="chat-title">AI助手</text>
          <text class="close-btn" @click="hideChat">✕</text>
        </view>
        <web-view 
          :src="chatUrl"
          class="chat-webview">
        </web-view>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  name: 'DifyChat',
  data() {
    return {
      showChatFrame: false,
      baseUrl: 'https://udify.app/chatbot/W6KLjKIF1kLPBQ8H',
      
      // 你的inputs参数 - 根据需要修改这里
      inputs: {
        xml: '<?xml version="1.0"?><user><name>张三</name></user>',
        user_name: '张三',
        context: '技术支持对话'
      }
    }
  },
  
  computed: {
    // 构建带参数的聊天URL
    chatUrl() {
      const params = new URLSearchParams()
      
      // 将inputs对象转换为URL参数
      Object.keys(this.inputs).forEach(key => {
        if (this.inputs[key]) {
          params.append(key, this.inputs[key])
        }
      })
      
      return `${this.baseUrl}?${params.toString()}`
    }
  },
  
  methods: {
    showChat() {
      // 可以在这里动态更新inputs参数
      this.inputs.timestamp = new Date().toISOString()
      
      this.showChatFrame = true
      console.log('聊天URL:', this.chatUrl)
    },
    
    hideChat() {
      this.showChatFrame = false
    },
    
    // 更新inputs参数的方法
    updateInputs(newInputs) {
      this.inputs = { ...this.inputs, ...newInputs }
    }
  }
}
</script>

<style scoped>
.chat-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #f5f5f5;
}

.user-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

.user-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.chat-btn {
  background: #1C64F2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
}

/* H5端iframe样式 */
/* #ifdef H5 */
.iframe-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: 80%;
  max-height: 700px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.iframe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.chat-iframe {
  width: 100%;
  height: calc(100% - 60px);
  border: none;
}
/* #endif */

/* 小程序和App端样式 */
/* #ifndef H5 */
.chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-content {
  width: 90%;
  height: 80%;
  max-width: 500px;
  max-height: 700px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.chat-webview {
  flex: 1;
  width: 100%;
}
/* #endif */

.chat-title {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.close-btn {
  font-size: 18px;
  color: #6b7280;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
