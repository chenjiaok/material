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
          <td><input type="text" disabled="disabled" v-model="material.code" placeholder = material.code></td>
        </tr>
        <tr>
          <td>描述</td>
          <td><input type="text" v-model="material.name" placeholder = material.name></td>
        </tr>
        <tr>
          <td>分类</td>
          <td><input type="text" v-model="material.classify" placeholder = material.classify></td>
        </tr>
        <tr>
          <td>供应商</td>
          <td><input type="text" v-model="material.supplier" placeholder = material.supplier></td>
        </tr>
        <tr>
          <td>供应商料号</td>
          <td><input type="text" v-model="material.spn" placeholder = material.spn></td>
        </tr>
        <tr>
          <td>最后一次确认时间</td>
          <td><input type="text"  v-model="material.updataTime" id="datetime1"></td>
        </tr>                  
      </tbody>
      
    </table>
    <div class="submit">
      <span class="btn-lg btn-danger"><router-link to="/material/add">新建物料</router-link></span>        
      <span class="btn-lg btn-danger" v-on:click="deleteMaterial(materials.code)">删除物料</span>
      <span class="btn-lg btn-danger" v-on:click="put">提交数据</span>
    </div>
  </div>
</template>

<script>
var aaa,datetimenow
export default {
  name: 'materialdetail',
  data () {
    return {
      title: '更改物料信息',  
      materials:[],
      material:{
        code: '',
        name: '',
        classify: '',
        supplier: '',
        spn: '',
      },         
    }
  },
  created () {
    this.findone()
    
      aaa = setInterval(()=>{
        var today=new Date();
        var year = today.getFullYear()
        var month = (today.getMonth()+1)%12
        var date = today.getDate()
        var hour=today.getHours();
        var minutes=today.getMinutes();
        var seconds=today.getSeconds();

        // 在小于10的数字前加一个‘0’
        if(month=11) {month = "12"  } 
          else if(month<10) {month = "0" + month  }      
        if(date<10) {date = "0" + date}
        if (hour<10){hour = "0" + hour}
        if (minutes<10){minutes = "0" + minutes}
        if (seconds<10){seconds="0" + seconds} 
        datetimenow = year + '-' + month + '-' + date + ' ' + hour + ":" + minutes + ":" + seconds;    
        if (document.getElementById('datetime1')) {
          document.getElementById('datetime1').value = datetimenow;
        }
        
      },1000)      
    

  },
  methods: { 
    put (){           
      var material2 = this.material
      material2.code = this.materials.code
      material2.updataTime = datetimenow
      console.log(JSON.stringify(material2))      
      this.$http.put('/material/put',material2).then((res) => {          
        console.log(JSON.stringify(res.data))         
        this.$router.push('/material/detail');            
      }).then(clearInterval(aaa))

    },
    deleteMaterial(materialcode){
      console.log('delete materialcode',materialcode);
      this.$http.delete('/material/delete/' + materialcode).then((res) => {
      this.$router.push('/material/total');
      })
    },
    findone () {
      this.$http.get('/material/detail').then((res) => {
        console.log(JSON.stringify(res.data))
        this.materials = res.data; 
      })     
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
