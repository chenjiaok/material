<template>
  <div id="app">
    <div class="container">
      <div class="menu">    
        <ul class="nav nav-tabs">
          <li><router-link to="/">首页</router-link></li>  
          <li><router-link to="/material">物料信息总览</router-link></li>
          <li><router-link to="/material/detail">单个物料信息</router-link></li>
          <li><router-link to="/material/put">更改物料信息</router-link></li>
          <li><router-link to="/material/add">新增物料信息</router-link></li>
          <li><router-link to="/stock">物料库存总览</router-link></li>
          <li><router-link to="/stock/history">物料库存更改记录</router-link></li>
          <li><router-link to="/stock/detail">单个物料库存</router-link></li>
          <!--li><router-link to="StockOut">采购记录</router-link></li!-->
          <!--li><router-link to="StockOut">生产计划</router-link></li!-->
          <!--li><router-link to="StockOut">发票信息记录</router-link></li!-->
          <!--li><router-link to="StockOut">成品BOM</router-link></li!-->
          <li><router-link to="/stock/in">入库记录</router-link></li>
          <li><router-link to="/stock/out">出库记录</router-link></li>
        </ul>
      </div>
      <div class="main">
        <router-view></router-view>  
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Arial;
  margin-top:30px;
}
</style>
