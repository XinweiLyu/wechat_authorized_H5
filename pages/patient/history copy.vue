<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {getToken} from "@/utils/token.js";
import axios from "axios";
// 加载库，设置worker
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "/pdf.worker.js";
import 'pdfjs-dist/web/pdf_viewer.css';
import {ElLoading, ElMessage} from "element-plus";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载PDF文件！",
    background: "rgba(0, 0, 0, 0.3)",
  })
  axios.get(`http://47.106.245.28:8002/report/export_report/?report_id=${route.query.id}`, {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${JSON.parse(getToken())?.token}`
    }
  }).then(async response => {
    const blob = new Blob([response.data], {
      type: "application/pdf"
    });
    var url = URL.createObjectURL(blob);
    const loadingTask = pdfjsLib.getDocument({
      url,
      // cMapUrl: "/public/cmaps/",
      // TODO pro env
      cMapUrl: "/cmaps/",
      cMapPacked: true
    });
    const temp = await pdfjsLib.getDocument(url).promise

    const renderPdf = pageNum => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const scale = 1.5;
      loadingTask.promise.then((pdf) => {
        pdf.getPage(pageNum)
            .then((page) => {
              const viewport = page.getViewport({ scale });
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };
              const renderTask = page.render(renderContext);

            })
      })
      const container = document.getElementById("container");
      container.appendChild(canvas);
      loadingTask.promise.then((pdf) => {
        pdf.getPage(pageNum)
            .then((page) => {
              const textlayer = document.createElement("div");
              textlayer.className = "textLayer";
              container.appendChild(textlayer);
              const viewport = page.getViewport({ scale });
              page.getTextContent().then(textContent => {
                const textlayer = document.createElement("div");
                textlayer.className = "textLayer";
                container.appendChild(textlayer);

                pdfjsLib.renderTextLayer({
                  textContentSource: textContent,
                  container: textlayer,
                  viewport: viewport,
                  textDivs: []
                });
              }).catch(error => {
                // console.error('Failed to retrieve text content:', error);
                // 这里可以添加额外的错误处理逻辑，比如显示一个错误消息给用户
              });
            })
      })
    }

    for (let i = 1; i <= temp.numPages; i++) {
      renderPdf(i);
    }
    loading.close();
  }).catch(error => {
    console.log(error)
  })
})

const toStatisticData = () => {
  const report_id = route.query.id;
  router.push({
    path: '/home/personalReportChartContent',
    query: {
      report_id,
      type: 'other'
    }
  })
}
</script>

<template>
  <div id="container">
    <el-link type="primary" style="z-index: 99999; margin: 0 10px 10px auto" @click="toStatisticData">查看图表统计数据</el-link>
  </div>
</template>

<style>
.left,
.right .top{
  z-index: 1000;
}
#container {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
</script>
