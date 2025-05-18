"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_services_wechat = require("../../utils/services/wechat.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      userInfo: null,
      loading: true
    };
  },
  onLoad() {
    this.initializeAuth();
  },
  methods: {
    initializeAuth() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          this.loading = true;
          const storedInfo = utils_services_wechat.getStoredUserInfo();
          if (storedInfo) {
            common_vendor.index.__f__("log", "at pages/index/index.vue:47", 4);
            this.userInfo = storedInfo;
            this.loading = false;
            return Promise.resolve(null);
          }
          const userInfo = yield utils_services_wechat.wechatAuth();
          common_vendor.index.__f__("log", "at pages/index/index.vue:55", 1);
          if (userInfo) {
            this.userInfo = userInfo;
          }
        } catch (error) {
          common_vendor.index.showToast({
            title: "授权失败，请重试",
            icon: "none"
          });
          common_vendor.index.__f__("error", "at pages/index/index.vue:64", "授权失败:", error);
        } finally {
          this.loading = false;
        }
      });
    },
    viewHistory() {
      common_vendor.index.navigateTo({
        url: "/pages/index/historyRecords/historyRecords"
      });
    },
    viewPdfReport() {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo
  }, $data.userInfo ? {
    b: $data.userInfo.headimgurl,
    c: common_vendor.t($data.userInfo.nickname),
    d: common_vendor.t($data.userInfo.province),
    e: common_vendor.t($data.userInfo.city)
  } : $data.loading ? {} : {}, {
    f: $data.loading,
    g: common_vendor.o((...args) => $options.viewHistory && $options.viewHistory(...args)),
    h: common_vendor.o((...args) => $options.viewPdfReport && $options.viewPdfReport(...args)),
    i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
