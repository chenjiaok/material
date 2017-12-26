<template>
  <div class="stockput">
    <h1> {{ title }} </h1>
    
      <table class="table table-bordered table-striped">
        <tbody>
          <tr>
            <td>编码</td>
            <td><input type="text" name="code" v-model="stocks.code" placeholder="请输入编码"></td>
          </tr>
          <tr>
            <td>描述</td>
            <td><input type="text" name="name" v-model="stocks.name" placeholder="请输入物料描述"></td>
          </tr>
          <tr>
            <td>分类</td>
            <td><input type="text" name="classify" v-model="stocks.classify" placeholder="请输入分类"></td>
          </tr>
          <tr>
            <td>供应商</td>
            <td><input type="text" name="supplier" v-model="stocks.supplier" placeholder="请输入供应商"></td>
          </tr>
          <tr>
            <td>供应商料号</td>
            <td><input type="text" name="spn" v-model="stocks.spn" placeholder="请输入供应商料号"></td>
          </tr>
          <tr>
            <td>数量</td>
            <td><input type="text" name="count" v-model="stocks.count" placeholder="请输入数量" ></td>
          </tr>
          <tr>
            <td>备注</td>
            <td><input type="text" name="remarks" v-model="stocks.remarks" placeholder="请输入备注" ></td>
          </tr>               
          <tr>
            <td>最后一次更新时间</td>
            <td><input type="text" name="updataTime" v-model="stocks.updataTime" id="datetime"></td>
          </tr>
        </tbody>
      </table>
      <input class="btn-lg btn-danger" type="submit" value="提交" v-on:click="send">
  </div>
</template>
<script>
var aaa, datetimenow
export default {
  name: 'stockput',
  data () {
    return {
      title: '新建记录',    
      stocks:{
        code: '',
        name: '',
        classify: '',
        supplier: '',
        spn: '',     
        count: '',
        remarks: '',
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

      var stock = this.stocks
      console.log('stock',JSON.stringify(stock))
      stock.updataTime = datetimenow
      console.log('add stock',JSON.stringify(stock))
      this.$http.post('/stock/put',stock).then((res) => {          
        console.log('res data',JSON.stringify(res.data)) 
        if (res.data=='not exists') {
          alert('此物料编码不存在,请创建物料后再入库、出库')
        } else if (res.data=='not enough') {
          alert('此物料编码库存不足,请先安排入库再出库')
        } 
        console.log('put',res.data)
        this.$router.push({path:'/stock/detail' ,query:{id: res.data}});   // 
        
        
      }).then(clearInterval(aaa) )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
