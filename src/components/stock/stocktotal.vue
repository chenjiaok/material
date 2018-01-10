<template>
  <div class="stocktotal">
      <h1>{{ title }}</h1>     
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>编码</th><th>描述</th><th>分类</th><th>供应商信息</th><th>供应商料号</th><th>数量</th><th>查看详情</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stocks" v-bind:key="item.id">
            <td class="hidden">{{ item.id }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.classify}}</td>
            <td>{{ item.supplier}}</td>
            <td>{{ item.spn}}</td>
            <td>{{ item.count}}</td> 
            <td class="text-center"><span class="glyphicon glyphicon-zoom-in" v-on:click="view(item.code)"></span></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'stocktotal',
  data () {
    return {
      title: '物料库存一览表',
      stocks:[],
    }
  },
  created () {
    this.findall()
  },
  methods: {
    findall () {
      this.$http.get('/stock/findall').then((res) => {
        this.stocks = res.data
      })      
    },
    view(item){
      console.log('view item',JSON.stringify(item))
      this.$router.push({path:'/stock/detail', query: {id: item}});     
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
