"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      historyRecords: [
        new UTSJSONObject({ id: 1, date: "2023-10-01", pdfUrl: "/path/to/report1.pdf" }),
        new UTSJSONObject({ id: 2, date: "2023-10-02", pdfUrl: "/path/to/report2.pdf" })
        // 添加更多记录
      ]
    };
  },
  methods: {
    viewPdf(pdfUrl = null) {
      const filePath = pdfUrl || "/static/report.pdf";
      common_vendor.wx$1.openDocument(new UTSJSONObject({
        filePath,
        success: function(res = null) {
          common_vendor.index.__f__("log", "at pages/index/historyRecords/historyRecords.uvue:40", "打开文档成功");
        },
        fail: function(err = null) {
          common_vendor.index.__f__("error", "at pages/index/historyRecords/historyRecords.uvue:43", "打开文档失败", err);
        }
      }));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.historyRecords, (record, k0, i0) => {
      return {
        a: common_vendor.t(record.date),
        b: common_vendor.o(($event) => $options.viewPdf(record.pdfUrl), record.id),
        c: record.id
      };
    }),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/historyRecords/historyRecords.js.map
