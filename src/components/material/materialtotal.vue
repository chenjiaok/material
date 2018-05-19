<template>
	<div class="materialtotal">
		<h1>{{ title }}</h1>
		<form action="/material/total" method='post' enctype="multipart/form-data">
			<span>批量导入物料信息</span>        
			<input type="button" id="upfile" class="upfile" value="上传excel文件" onclick="document.getElementById('file').click()" >
			<span  id="upfileResult" class="upfileResult" ></span>
			<input type="file" id="file" class="file" onchange="document.getElementById('upfileResult').innerHTML=this.value">
			<input class="btn-danger" type="submit" value="提交文件">
		</form>      
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>编码</th><th>描述</th><th>分类</th><th>供应商信息</th><th>供应商料号</th><th>最后一次更新时间</th><th>查看详情</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in materials" v-bind:key="item.code">
					<td>{{ item.code }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.classify}}</td>
					<td>{{ item.supplier}}</td>
					<td>{{ item.spn}}</td>
					<td>{{ timemoment(item.updataTime) }}</td>
					<td class="text-center"><span class="glyphicon glyphicon-zoom-in" v-on:click="viewItem(item.code)"></span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
var moment = require('moment');
export default {
	name: 'materialtotal',
	data () {
		return {
			title: '物料信息一览表',
			materials:[],
		}
	},
	created: function () {
		this.findAll()    
	},
	methods: {
		timemoment: function (time) {
			return moment(time).format("YYYY-MM-DD HH:mm:ss")
		},
		findAll: function () {
			this.$http.get('/material/findall').then((res) => {
			//console.log('res data',JSON.stringify(res.data))               
				this.materials = res.data             
			})      
		},
		viewItem: function (item) {
		//console.log('view item',JSON.stringify(item)),
			this.$router.push({path:'/material/detail/', query: {id: item}});     
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
	display: inline;
}
input[type="file"]{
	display: inline;
}
.file{
	visibility: hidden;
	background-color: yellow;
}
.upfile{
	background-color: greenyellow;
}
.upfileResult{
	background-color: blanchedalmond;
}

</style>
