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
            <td><input type="text" name="updataTime" v-model="materials.updataTime" id="datetime"></td>
          </tr>
        </tbody>
      </table>
      <input class="btn-lg btn-danger" type="submit" value="提交" v-on:click="send">
  </div>
</template>
<script>
var aaa, datetimenow
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
      },
    }
  },
  
  created () {
    this.method = 'post'
    
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
        if (document.getElementById('datetime')) {
          document.getElementById('datetime').value = datetimenow;
        }
      },1000)       
    
    
  },
  methods: {
    send () {
      var material = this.materials
      material.updataTime = datetimenow
      console.log('add materials',JSON.stringify(this.material))
      this.$http.post('/material/add',material).then((res) => {          
        console.log('res data',JSON.stringify(res.data)) 
        if(res.data=='exists'){
            alert('此物料编码存在,,请更换物料编码')
        } else {
          this.$router.push('/material/detail');
        }         
                    
      }).then(clearInterval(aaa) )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
