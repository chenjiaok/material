<template>
  <div class="stockput">
    <h1> {{ title }} </h1>
    
      <table class="table table-bordered table-striped">
        <tbody>
          <tr>
            <td>编码</td>
            <td><input type="text" name="code" v-model="stocks.code" placeholder="请输入编码"></td>
          </tr>
          <tr>
            <td>描述</td>
            <td><input type="text" name="name" v-model="stocks.name" placeholder="请输入物料描述"></td>
          </tr>
          <tr>
            <td>分类</td>
            <td><input type="text" name="classify" v-model="stocks.classify" placeholder="请输入分类"></td>
          </tr>
          <tr>
            <td>供应商</td>
            <td><input type="text" name="supplier" v-model="stocks.supplier" placeholder="请输入供应商"></td>
          </tr>
          <tr>
            <td>供应商料号</td>
            <td><input type="text" name="spn" v-model="stocks.spn" placeholder="请输入供应商料号"></td>
          </tr>
          <tr>
            <td>数量</td>
            <td><input type="text" name="count" v-model="stocks.count" placeholder="请输入数量" ></td>
          </tr>
          <tr>
            <td>备注</td>
            <td><input type="text" name="remarks" v-model="stocks.remarks" placeholder="请输入备注" ></td>
          </tr>               
          <tr>
            <td>最后一次更新时间</td>
            <td><input type="text" name="updataTime" v-model="stocks.updataTime" ></td>
          </tr>
        </tbody>
      </table>
      <input class="btn-lg btn-danger" type="submit" value="提交" v-on:click="modifyStock">
  </div>
</template>
<script>
var moment = require('moment');
export default {
	name: 'stockput',
	data () {
		return {
			title: '新建记录',    
			stocks:{
				code: '',
				name: '',
				classify: '',
				supplier: '',
				spn: '',     
				count: '',
				remarks: '',
				updataTime:''
			},
		}
	},
	
	created: function () {
		this.method = 'post'    
		setInterval(()=>{
			this.stocks.updataTime = moment().format("YYYY-MM-DD HH:mm:ss")
		},500) 
	},
	methods: {
		modifyStock: function () {
			var stock = this.stocks
			//console.log('stock',JSON.stringify(stock))
			stock.updataTime = new Date()
			//console.log('add stock',JSON.stringify(stock))
			this.$http.post('/stock/put',stock).then((res) => {          
				//console.log('res data',JSON.stringify(res.data)) 
				if (res.data=='not exists') {
					alert('此物料编码不存在,请创建物料后再入库、出库')
				} else if (res.data=='not enough') {
					alert('此物料编码库存不足,请先安排入库再出库')
				} 
				//console.log('put',res.data)
				this.$router.push({path:'/stock/detail' ,query:{id: res.data}});   // 
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
