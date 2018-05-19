<template>
	<div class="materialdetail">
		<h1> {{ title }} </h1>
		<p>
			物料编码：<input type="text" name="code" v-model="materials.code"> 
			物料描述：<input type="text" name="name" v-model="materials.name">
			<input type="submit" value="搜索">
		</p>
		<table class="table table-bordered table-striped">
			<tbody>
				<tr>
					<td>编码</td>
					<td><input type="text" disabled="disabled" v-model="materials.code"></td>
				</tr>
				<tr>
					<td>描述</td>
					<td><input type="text" v-model="materials.name" ></td>
				</tr>
				<tr>
					<td>分类</td>
					<td><input type="text" v-model="materials.classify" ></td>
				</tr>
				<tr>
					<td>供应商</td>
					<td><input type="text" v-model="materials.supplier" ></td>
				</tr>
				<tr>
					<td>供应商料号</td>
					<td><input type="text" v-model="materials.spn" ></td>
				</tr>
				<tr>
					<td>最后一次更改时间</td>
					<td>{{ timemoment(materials.updataTime)}}</td>
				</tr>
				<tr>
					<td>当前时间</td>
					<td>{{ material.updataTime }}</td>
				</tr>                  
			</tbody>
		
		</table>
		<div class="submit">
			<span class="btn-lg btn-danger"><router-link to="/material/add">新建物料</router-link></span>        
			<span class="btn-lg btn-danger" v-on:click="deleteMaterial(materials.code)">删除物料</span>
			<span class="btn-lg btn-danger" v-on:click="modifyMaterial">提交数据</span>
		</div>
	</div>
</template>

<script>
var moment = require('moment');
export default {
	name: 'materialdetail',
	data () {
		return {
			title: '更改物料信息',  
			materials:[],
			material: {
				updataTime: '',
			}
		}
	},
	created: function () {
		console.log('query.id',this.$route.query.id)
		if (this.$route.query.id) {
			console.log('query.id',this.$route.query.id)
			this.$http.get('/material/detail/findonly',{params: {id: this.$route.query.id}}).then( (res) => {
				//console.log('res.data',JSON.stringify(res.data))
				this.materials = res.data; 
			})      
		}else{
			this.findOne()
		}
		setInterval( () => {
			this.material.updataTime = moment().format("YYYY-MM-DD HH:mm:ss")
		},500) 
	},
	methods: {
		timemoment: function (updataTime) {
			return moment(updataTime).format("YYYY-MM-DD HH:mm:ss")
		},
		modifyMaterial: function () {           
			this.material = this.materials
			this.material.updataTime = this.timemoment(new Date())
			
			this.$http.put('/material/put',this.material).then((res) => {          
				console.log(JSON.stringify(res.data))         
				this.$router.push('/material/detail');            
			})

		},
		deleteMaterial: function (materialcode) {
			//console.log('delete materialcode',materialcode);
			this.$http.delete('/material/delete/' + materialcode).then((res) => {
			this.$router.push('/material/total');
			})
		},
		findOne: function () {
			this.$http.get('/material/detail').then((res) => {
				//console.log(JSON.stringify(res.data))
				this.materials = res.data; 
			})     
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
