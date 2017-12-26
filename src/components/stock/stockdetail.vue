<template>
  <div class="stockdetail">
      <h1>{{ title }}</h1> 
      <p>
        物料编码：<input type="text" name="code" v-model="stocks.code"> 
        物料描述：<input type="text" name="name" v-model="stocks.name">
        <input type="submit" value="搜索" v-on:click="findOnly(stocks.code,stocks.name )">
      </p>    
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>编码</th><th>描述</th><th>分类</th><th>供应商信息</th><th>供应商料号</th><th>数量</th><th>时间</th><th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stocks" v-bind:key="item.code">
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.classify}}</td>
            <td>{{ item.supplier}}</td>
            <td>{{ item.spn}}</td>
            <td>{{ item.count}}</td>
            <td>{{ item.updataTime}}</td>
            <td>{{ item.remarks}}</td>            
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'stockdetail',
  data () {
    return {
      title: '单物料物料库存变更详情',
      stocks:[],
    }
  },
  created () {
    console.log('query.id',this.$route.query.id)
    if (this.$route.query.id) {
      console.log('query.id',this.$route.query.id)
      this.$http.get('/stock/detail/findonly',{params: {id: this.$route.query.id}}).then((res) => {
        console.log('res.data',JSON.stringify(res.data))
        this.stocks = res.data; 
      }) 
    }else {
      this.findall()
    }
    
  },
  methods: {
    findall () {
      this.$http.get('/stock/detail').then((res) => {
        console.log('res data',JSON.stringify(res.data))
        this.stocks = res.data
      })      
    },
    findOnly (code,name){      
      if (code) {
        console.log('find by code',code)
        this.$http.get('/stock/detail/findonly',{params: {id: code}}).then((res) => {
          console.log('res.data',JSON.stringify(res.data))
          if(res.data=='notfound'){
            alert('此物料不存在,请更换物料编码')
          } else if(res.data=='exists'){
            alert('此物料编码存在,,请更换物料编码')
          } else {
            this.stocks = res.data; 
          }       
        })
      }else if (name) {
        console.log('find by name',name)
        this.$http.get('/stock/detail/findlike',{params: {id: name}}).then((res) => {
          console.log('res.data',JSON.stringify(res.data))
          if(res.data=='notfound'){
            alert('此名称不存在,请更换物料名称')
            this.stocks = []
          } else {
            this.stocks = res.data;
          }          
        })
      } else {
        alert('请输入物料编码或者物料名称')
      }
      
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
.submit{
  margin:20px 0;
}
</style>
