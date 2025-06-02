<template>
  <view class="main">
	  <div class="big_box" v-for="(item,index) in dataList" :key="index">
		  <div class="box_one">
			  <div class="" style="font-weight: 700;">{{item.name||''}}</div>
			  <div @click="handleReport(item)" class="" style="color: #516bea;">查看报告</div>
		  </div>
		  <div class="box_one other">
			  <div class="">机构:{{item.company||''}}</div>
			  <div class="">{{item.time||''}}</div>
		  </div>
	  </div>
	  <button @click="handlePdf" class="btn">查看PDF</button>
  </view>
</template>

<script>
import { getUserList,getUserPdf } from '@/api/patient.js';
export default {
  name: '',
  components: {},
  data() {
    return {
		dataList:[{
        name: '张三',
        company: '测试医院',
        time: '2024-06-01'
      },
      {
        name: '李四',
        company: '健康体检中心',
        time: '2024-06-02'
      }],
		form:{
		page_no:1,
		page_size:10
		}
	};
  },
  onLoad() {
    this.getUserListFn();
  },
  mounted() {},
  onReachBottom(){
	  // 需要判是否还需要加载下一页数据
	  this.form.page_no++
	  this.getUserListFnPage()
	  console.log('触底了')
  },
  
  
  methods: {
	  // 首次加载请求
    getUserListFn() {
      getUserList(this.form).then(res => {
        this.dataList=res
      });
    }, 
	// 下一页加载请求（增加是否还有数据的判断）
	getUserListFnPage() {
      getUserList(this.form).then(res => {
        this.dataList=[...this.dataList,...res]
      });
    },
	// 查询pdf
	handlePdf(){
		this.dataList.push(...this.dataList)
		// getUserPdf({report_id:1}).then(res=>{
		// 	console.log(res,'999')
		// })
	},
	handleReport(row){
		console.log(row)
		getUserPdf({report_id:row.report_id}).then(res=>{
			console.log(res,'999')
		})
	}
  },
  computed: {},
};
</script>
<style scoped lang="scss">
	.main{
		padding: 20rpx 40rpx;
	}
	.big_box{
		margin-bottom: 20rpx;
		box-sizing: border-box;
		border: 2px solid #ccc;
		border-radius: 10rpx;
		padding: 20rpx ;
		.box_one{
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.other{
			margin-top: 40rpx;
			color: #999;
		}
	}
	.btn{
		margin-top: 40rpx;
	}
</style>
