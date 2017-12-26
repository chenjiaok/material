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
            <td>{{ item.updataTime}}</td>
            <td class="text-center"><span class="glyphicon glyphicon-zoom-in" v-on:click="view(item.code)"></span></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'materialtotal',
  data () {
    return {
      title: '物料信息一览表',
      materials:[],
    }
  },
  created () {
    this.findall()
  },
  methods: {
    findall () {
      this.$http.get('/material/findall').then((res) => {
        console.log('res data',JSON.stringify(res.data))
        this.materials = res.data
      })      
    },
    view(item){
      console.log('view item',JSON.stringify(item)),
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
