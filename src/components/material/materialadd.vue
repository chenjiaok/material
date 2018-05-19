<template>
	<div class="materialadd">
		<h1> {{ title }} </h1>
		<table class="table table-bordered table-striped">
			<tbody>
				<tr>
					<td>编码</td>
					<td><input type="text" name="code" v-model="materials.code" placeholder="请输入编码"></td>
				</tr>
				<tr>
					<td>描述</td>
					<td><input type="text" name="name" v-model="materials.name" placeholder="请输入物料描述"></td>
				</tr>
				<tr>
					<td>分类</td>
					<td><input type="text" name="classify" v-model="materials.classify" placeholder="请输入分类"></td>
				</tr>
				<tr>
					<td>供应商</td>
					<td><input type="text" name="supplier" v-model="materials.supplier" placeholder="请输入供应商"></td>
				</tr>
				<tr>
					<td>供应商料号</td>
					<td><input type="text" name="spn" v-model="materials.spn" placeholder="请输入供应商料号"></td>
				</tr>
				<tr>
					<td>最后一次更新时间</td>
					<td><input v-model="materials.updataTime"></td>
				</tr>
			</tbody>
		</table>
		<input class="btn-lg btn-danger" type="submit" value="提交" v-on:click="submitMaterial">
	</div>
</template>
<script>
var moment = require('moment');

export default {
	name: 'materialadd',
	data () {
		return {
			title: '新建物料',
			materials:{
				code: '',
				name: '',
				classify: '',
				supplier: '',
				spn: '',
				updataTime:''
			},
		}
	},
  
	created: function () {
		this.method = 'post'
		setInterval( () => {
		this.materials.updataTime = moment().format("YYYY-MM-DD HH:mm:ss")
		},500) 
	},
	methods: {
		submitMaterial: function () {
		this.$http.post('/material/add',this.materials).then((res) => {
			//console.log('res data',JSON.stringify(res.data)) 
			if( res.data =='exists'){
				alert('此物料编码存在,,请更换物料编码')
			} else {
			this.$router.push('/material/detail')
			}
		})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style> 
