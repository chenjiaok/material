<template>
	<div class="stockhistory">
		<h1>{{ title }}</h1>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>编码</th><th>描述</th><th>分类</th><th>供应商信息</th><th>供应商料号</th><th>数量</th><th>时间</th><th>备注</th><th>查看详情</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in stocks" v-bind:key="item.id">
					<td class="hidden">{{ item.id }}</td>
					<td>{{ item.code }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.classify }}</td>
					<td>{{ item.supplier }}</td>
					<td>{{ item.spn }}</td>
					<td>{{ item.count }}</td>
					<td>{{ timemoment(item.updataTime) }}</td>
					<td>{{ item.remarks }}</td>            
					<td class="text-center"><span class="glyphicon glyphicon-zoom-in" v-on:click="viewItem(item.code)"></span></td>
				</tr>
			</tbody>
		</table>
		<div class="submit">
			<span class="btn-lg btn-danger"><router-link to="/stock/put">新建记录</router-link></span>        
		</div>   
	</div>
</template>

<script>
var moment = require('moment');
export default {
	name: 'stockhistory',
	data () {
		return {
			title: '库存修改记录表',
			stocks:[],
		}
	},
	created: function () {
		this.findAll()
	},
	methods: {
		timemoment: function (updataTime) {
			return moment(updataTime).format("YYYY-MM-DD HH:mm:ss")
		},
		findAll: function () {
			this.$http.get('/stock/history').then((res) => {
				//console.log('res data',JSON.stringify(res.data))
				this.stocks = res.data
			})      
		},
		viewItem: function (item) {
			//console.log('view item',JSON.stringify(item)),
			this.$router.push({path:'/stock/detail', query: {id: item}});    
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
