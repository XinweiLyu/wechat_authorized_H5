<template>
  <view class="dify-container">
    <view class="header">
      <text class="title">Dify 聊天机器人</text>
    </view>
    <view id="dify-chatbot-entry"></view>
  </view>
</template>



<script>
export default {
  name: 'DifyChatbotPage',
  created() {
    // Dify Chatbot 配置与脚本动态加载
    window.difyChatbotConfig = {
      token: 'lhWuyq0yxJyB24CN',
      systemVariables: {
        // user_id: 'YOU CAN DEFINE USER ID HERE',
        // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
      },
    };
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.id = 'lhWuyq0yxJyB24CN';
    script.defer = true;
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
.dify-container {
  width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
}
.header {
  background: #1C64F2;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
}
#dify-chatbot-bubble-button {
  background-color: #1C64F2 !important;
}
#dify-chatbot-bubble-window {
  width: 24rem !important;
  height: 40rem !important;
}
</style>
