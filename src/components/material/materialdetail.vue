<template>
	<div class="materialdetail">
		<h1> {{ title }} </h1>
		<p>
			物料编码：<input type="text" name="code" v-model="materials.code"> 
			物料描述：<input type="text" name="name" v-model="materials.name">
			<input type="submit" value="搜索" v-on:click="findOnly(materials.code,materials.name)">
		</p>
		<div class="codeSelect">  
			<table class="table table-bordered table-striped" v-show="isActive">
				<tbody>
					<tr>
						<td>编码</td><td>{{ materials.code }}</td> 
					</tr>
					<tr>
						<td>描述</td><td>{{ materials.name }}</td>
					</tr>
					<tr>
						<td>分类</td><td>{{ materials.classify }}</td>
					</tr>
					<tr>
						<td>供应商</td><td>{{ materials.supplier }}</td>
					</tr>
					<tr>
						<td>供应商料号</td><td>{{ materials.spn }}</td>
					</tr>
					<tr>
						<td>最后一次确认时间</td><td>{{ timemoment(materials.updataTime) }}</td>
					</tr>                  
				</tbody>          
			</table>  
		</div>
		<div class="nameSelect">    
			<table class="table table-bordered table-hover" v-show="!isActive" >
				<thead>
					<tr>
						<th>编码</th><th>描述</th><th>分类</th><th>供应商信息</th><th>供应商料号</th><th>最后一次更新时间</th><th>查看详情</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in materials" v-bind:key="item.code">
						<td>{{ item.code }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.classify }}</td>
						<td>{{ item.supplier }}</td>
						<td>{{ item.spn }}</td>
						<td>{{  timemoment(item.updataTime) }}</td>
						<td class="text-center"><span class="glyphicon glyphicon-zoom-in" v-on:click="view(item.code)"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="submit">
			<span class="btn-lg btn-danger"><router-link to="/material/add">新建物料</router-link></span>
			<span class="btn-lg btn-danger "v-on:click="modifyMaterial(materials.code)">修改物料</span>
			<span class="btn-lg btn-danger" v-on:click="deleteMaterial(materials.code)">删除物料</span>
		</div>  
	</div>
</template>


<script>
var moment = require('moment');

export default {
	name: 'materialdetail',
	data () {
		return {
		title: '物料详细信息', 
		isActive: true,  
		materials:[],         
		}
	},
	created: function () { 
		//console.log('this.$route.query.id',this.$route.query.id)   
		if (this.$route.query.id) {
		//console.log('query.id',this.$route.query.id)
			this.$http.get('/material/detail/findonly',{params: {id: this.$route.query.id}}).then( (res) => {
				//console.log('res.data',JSON.stringify(res.data))
				this.materials = res.data; 
			})      
		}else{
			this.findOne()
		}
	},
	methods: {
		timemoment: function (updataTime) {
			return moment(updataTime).format("YYYY-MM-DD HH:mm:ss")
		},
		deleteMaterial: function (materialcode) {
		//console.log('delete materialcode',materialcode);
			this.$http.delete('/material/delete/' + materialcode).then( (res) => {
			this.$router.push('/material/total');
			})
		},
		modifyMaterial: function (materialcode) {      
			this.$router.push({path:'/material/put',query:{id:materialcode}} );      
		},
		findOne: function () {

			this.$http.get('/material/detail').then( (res) => {
				//console.log('get material detail',JSON.stringify(res.data))
				this.materials = res.data; 
			})     
		},
		findOnly: function (code,name){      
			if (code) {
				//console.log('find by code',code)
				this.$http.get('/material/detail/findonly',{params: {id: code}}).then( (res) => {
				//console.log('res.data',JSON.stringify(res.data))
					if(res.data=='notfound'){
						alert('此物料不存在,请更换物料编码')
					} else if(res.data=='exists'){
						alert('此物料编码存在,,请更换物料编码')
					} else {
						this.materials = res.data; 
					}       
				})
			}else if (name) {
				//console.log('find by name',name)
				this.$http.get('/material/detail/findlike',{params: {id: name}}).then( (res) => {
				//console.log('res.data',JSON.stringify(res.data))
					if(res.data=='notfound'){
						alert('此名称不存在,请更换物料名称')
						this.materials = []
					} else {
						if (res.data.length > 1 ) {
							this.isActive = false
							this.materials = res.data;
						} else if (res.data.length == 1 ){
							this.isActive = true
							this.materials = res.data[0];
						}            
					}          
				})
			} else {
				alert('请输入物料编码或者物料名称')
			}
			
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
